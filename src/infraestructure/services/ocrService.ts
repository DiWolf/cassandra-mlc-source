import { BlobServiceClient } from "@azure/storage-blob";
import createClient from "@azure-rest/ai-vision-image-analysis";
import { AzureKeyCredential } from "@azure/core-auth";
import { pdfToPng } from "pdf-to-png-converter";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();

// Configuración de Azure
const endpoint = process.env.AZURE_COMPUTER_VISION_ENDPOINT!;
const key = process.env.AZURE_COMPUTER_VISION_KEY!;
const storageConnectionString = process.env.AZURE_ACCOUNT_CONNECTION_STRING!;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!;

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = ["Read"];

// Subir imágenes a Azure Blob Storage
async function uploadToBlobStorage(filePath: string): Promise<string> {
  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      storageConnectionString
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobName = `${uuidv4()}-${filePath.split("/").pop()}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadFile(filePath);
    return blockBlobClient.url;
  } catch (error) {
    console.error("Error al subir al Blob Storage:", error);
    throw new Error("Error al subir la imagen al Blob Storage.");
  }
}

// Realizar OCR con Azure Computer Vision
async function extractTextFromImage(imageUrl: string): Promise<string> {
  try {
    const result = await client.path("/imageanalysis:analyze").post({
      body: { url: imageUrl },
      queryParameters: { features },
      contentType: "application/json",
    });

    if (result.body && "readResult" in result.body) {
      const readResult = result.body.readResult as any;
      let extractedText = "";
      if (readResult.blocks) {
        for (const block of readResult.blocks) {
          if (block.lines) {
            for (const line of block.lines) {
              extractedText += line.text + " ";
            }
          }
        }
      }
      return extractedText.trim();
    } else {
      console.error("Respuesta OCR inesperada:", result.body);
      return "";
    }
  } catch (error) {
    console.error("Error al extraer texto:", error);
    throw new Error("Error durante el proceso OCR.");
  }
}

// Convertir PDF a imágenes y procesarlas
async function processPdfAdjusted(pdfPath: string): Promise<Record<string, string>> {
  const outputDir = "./uploads/pdf_images";
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const images = await pdfToPng(pdfPath, {
    outputFolder: outputDir,
    disableFontFace: false,
    viewportScale: 2.0,
  });

  let fullText = "";

  for (const image of images) {
    const imageUrl = await uploadToBlobStorage(image.path);
    const text = await extractTextFromImage(imageUrl);
    fullText += text + "\n";
    fs.unlinkSync(image.path);
  }

  console.log("Texto Completo Extraído:", fullText);
  return parseExtractedTextImproved(fullText);
}

// Extraer secciones del texto
function parseExtractedTextImproved(text: string): Record<string, any> {
  const licitacionRegex = /LICITACIÓN PÚBLICA No\.?\s*([A-Z0-9\/\-]+)/i;
  const descripcionRegex = /Descripción de los servicios:\s*(.*?)(?=\s*Actos de la Licitación Pública)/i;
  const informacionBasesRegex = /bases.*?días (.*?) en (?:un\s+)?horario/i;
  const blockRegex =
    /Junta de Aclaraciones.*?Propuestas Técnicas y Económicas.*?\d{2}:\d{2} horas.*?Lugar/i;

  const cleanedText = cleanExtractedText(text);
  console.log("Texto limpio para analizar:", cleanedText);

  const blockMatch = cleanedText.match(blockRegex);

  let blockArray: string[] = [];
  let combined: string[] = [];
  let results: Record<string, string> = {};

  if (blockMatch) {
    const blockText = blockMatch[0];

    // Extraer partes del bloque y asignar índices
    const regexParts =
      /(Junta de Aclaraciones|Presentación y Apertura de Fallo|Propuestas Técnicas y Económicas|\d{1,2} de \w+ de \d{4}|\d{1,2}:\d{2} horas)/g;
    blockArray = blockText.match(regexParts) || [];

    // Crear combinaciones según los índices
    if (blockArray.length >= 9) {
      combined = [
        [ blockArray[3], blockArray[6]].join(" - "),
        [ blockArray[4], blockArray[7]].join(" - "),
        [ blockArray[5], blockArray[8]].join(" - "),
      ];

      // Asignar combinaciones a las variables específicas
      results = {
        junta_aclaraciones: combined[0],
        presentacion_propuestas: combined[1],
        fallo_adju: combined[2],
      };
    }
  }

  const sections = {
    numero_licitacion: cleanedText.match(licitacionRegex)?.[1] || "No encontrado",
    descripcion_servicios: cleanedText.match(descripcionRegex)?.[1]?.trim() || "No encontrado",
    informacion_bases: cleanedText.match(informacionBasesRegex)?.[1]?.trim() || "No encontrado",
    block: blockArray, // Array completo de las partes extraídas
    combined: combined, // Combinaciones específicas
    ...results, // Información específica asignada
  };

  console.log("Secciones extraídas:", sections);
  return sections;
}

// Limpieza adicional del texto
function cleanExtractedText(text: string): string {
  return text
    .replace(/[\n\r]+/g, " ") // Sustituye saltos de línea por espacios
    .replace(/[\t]+/g, " ") // Sustituye tabulaciones por espacios
    .replace(/\s{2,}/g, " ") // Reduce múltiples espacios a uno solo
    .trim(); // Elimina espacios al inicio y al final
}



export { uploadToBlobStorage, extractTextFromImage, processPdfAdjusted };
