import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_ACCOUNT_CONNECTION_STRING!; // Reemplaza con tu conexión

const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);

/**
 * Subir archivo a un container dinámico en Azure Blob Storage
 * @param file - Archivo que se subirá
 * @param containerName - Nombre del container (dinámico)
 * @returns Nombre del archivo subido
 */
export async function uploadFileToBlob(
  file: Express.Multer.File,
  containerName: string,
  blobName: string
): Promise<string> {
  try {
    if (!containerName) {
      throw new Error("El nombre del container no puede estar vacío.");
    }

    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Asegúrate de que el contenedor exista, y si no, créalo
    const exists = await containerClient.exists();
    if (!exists) {
      await containerClient.create();
    }

    // Subir el archivo
    console.log("Subiendo archivo a Blob Storage...");
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(file.buffer);

    // Retorna solo el nombre del archivo
    return blobName;
  } catch (error) {
    console.error("Error subiendo archivo a Blob Storage:", error);
    throw new Error("No se pudo subir el archivo al Blob Storage.");
  }
}

export async function deleteFileFromBlob(containerName: string, blobName: string) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.deleteIfExists();
  console.log(`Archivo eliminado: ${blobName}`);
}
