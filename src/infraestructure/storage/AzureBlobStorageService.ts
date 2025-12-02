import { IStorageService } from "@application/interfaces/storage.interface";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export class AzureBlobStorageService implements IStorageService {
  private blobServiceClient: BlobServiceClient;

  constructor() {
    const connectionString = process.env.AZURE_ACCOUNT_CONNECTION_STRING;

    if (!connectionString) {
      throw new Error(
        "La variable de entorno AZURE_ACCOUNT_CONNECTION_STRING no está definida."
      );
    }
    this.blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
  }

  async uploadFile(
    containerName: string,
    filePath: string, // Cambiado a filePath para admitir subcarpetas
    fileContent: Buffer | string,
    contentType: string
  ): Promise<string> {
    // Obtener el cliente del contenedor
    const containerClient = this.getContainerClient(containerName);

    // Crear el contenedor si no existe
    await containerClient.createIfNotExists({ access: "container" });

    // Crear un cliente para el blob dentro del contenedor
    const blockBlobClient = containerClient.getBlockBlobClient(filePath);

    // Asegurarse de que el contenido esté en formato Buffer
    const content =
      typeof fileContent === "string" ? Buffer.from(fileContent) : fileContent;

    // Subir el archivo al blob
    await blockBlobClient.uploadData(content, {
      blobHTTPHeaders: { blobContentType: contentType },
    });

    // Retornar la URL del archivo subido
    return blockBlobClient.url;
  }

  async readFile(containerName: string, fileName: string): Promise<Buffer> {
    const containerClient = this.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    const downloadResponse = await blockBlobClient.download(0);
    return this.streamToBuffer(
      downloadResponse.readableStreamBody as NodeJS.ReadableStream
    );
  }

  async deleteFile(containerName: string, fileName: string): Promise<void> {
    const containerClient = this.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.deleteIfExists();
  }

  getFileUrl(containerName: string, fileName: string): string {
    const containerClient = this.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(fileName);
    return blobClient.url;
  }

  private getContainerClient(containerName: string): ContainerClient {
    return this.blobServiceClient.getContainerClient(containerName);
  }

  private async streamToBuffer(
    readableStream: NodeJS.ReadableStream
  ): Promise<Buffer> {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      readableStream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      readableStream.on("end", () => resolve(Buffer.concat(chunks)));
      readableStream.on("error", reject);
    });
  }
}
