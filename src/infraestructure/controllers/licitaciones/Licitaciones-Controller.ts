import { Request, Response } from "express";
import { MulterRequest } from "@infraestructure/types/MulterRequest";
import LicitacionesDTO from "@application/dtos/LicitacioneDTO";

import {
  CreateLicitacionUseCase,
  UploadLicitacionUseCase,
  ListAllLicitacionUseCase,
} from "@application/use-cases/licitaciones-use-cases";
import { uploadFileToBlob } from "@infraestructure/services/azureBlobService";

export class LicitacionesController {
  constructor(
    private createLicitacion: CreateLicitacionUseCase,
    private uploadFile: UploadLicitacionUseCase,
    private listAll: ListAllLicitacionUseCase
  ) {}

  async create(req: Request, res: Response): Promise<any> {
    try {
      const { datos } = req.body; // Recibe datos y nombre del container
      const containerName = "publico"; // Nombre del container

      const parsedDatos = JSON.parse(datos); // Parsear datos enviados como string
      const file = req.file; // Archivo recibido
      const blobName = `licitaciones/${Date.now()}-${file?.originalname}`; // Prefijo para el nombre del archivo
      if (!file) {
        throw new Error("No se proporcionó ningún archivo.");
      }

      if (!containerName) {
        throw new Error("No se proporcionó un nombre de container.");
      }

      // Subir archivo al container y obtener su nombre
      const archivoNombre = await uploadFileToBlob(
        file,
        containerName,
        blobName
      );

      // Guardar los datos y el nombre del archivo en la base de datos
      const result = await this.createLicitacion.execute({
        ...parsedDatos,
        archivo: archivoNombre, // Guardar solo el nombre del archivo
      });
      
      const io = req.app.get("socketio");
      io.emit("licitacionCreadaPublica", result);

      return res.status(201).json({ success: true, data: result });
      
    } catch (error) {
      console.error("Error al crear licitación:", error);

      res.status(500).json({
        success: false,
        message: "Error al crear la licitación.",
        error: (error as Error).message || "Error desconocido",
      });
    }
  }

  async uploadPdf(req: Request & MulterRequest, res: Response): Promise<any> {
    try {
      const pdfPath = req.file?.path;
      console.log("PDF path:", pdfPath);
      if (!pdfPath) {
        res.status(400).send("No se proporcionó ningún archivo PDF.");
        return;
      }
      const data = await this.uploadFile.execute(pdfPath);
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
      res.status(500).json({
        success: false,
        message: "Error al procesar el archivo. Inténtelo de nuevo más tarde.",
        error: (error as Error).message || "Error desconocido",
      });
    }
  }

  async findAll(res: Response): Promise<any> {
    try {
      const licitaciones = (await this.listAll.execute()) as LicitacionesDTO[];
      return licitaciones;
    } catch (error) {
      console.error("Error al obtener las licitaciones:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener las licitaciones.",
        error: (error as Error).message || "Error desconocido",
      });
    }
  }
}
