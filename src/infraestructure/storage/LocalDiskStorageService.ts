import { IStorageService } from "@application/interfaces/storage.interface";
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

export class LocalDiskStorageService implements IStorageService {
  private basePath: string;

  constructor(basePath = "/public") {
    this.basePath = basePath;
  }

  async uploadFile(
    containerName: string,
    filePath: string,
    fileContent: Buffer | string,
    contentType: string
  ): Promise<string> {
    const fullDir = path.join(this.basePath, containerName);
    const fullPath = path.join(fullDir, filePath);

    // Asegura que el directorio exista
    await mkdir(path.dirname(fullPath), { recursive: true });

    // Guarda el archivo
    const content = typeof fileContent === "string"
      ? Buffer.from(fileContent)
      : fileContent;

    await writeFile(fullPath, content);

    // Retorna una URL simulada o una ruta relativa
    return `/public/${containerName}/${filePath}`.replace(/\\/g, "/");
  }

  async readFile(containerName: string, fileName: string): Promise<Buffer> {
    const fullPath = path.join(this.basePath, containerName, fileName);
    return readFile(fullPath);
  }

  async deleteFile(containerName: string, fileName: string): Promise<void> {
    const fullPath = path.join(this.basePath, containerName, fileName);
    await unlink(fullPath);
  }

  getFileUrl(containerName: string, fileName: string): string {
    return `/public/${containerName}/${fileName}`.replace(/\\/g, "/");
  }
}
