export interface IStorageService {
  uploadFile(
    container: string,
    fileName: string,
    content: Buffer | string,
    contentType: string
  ): Promise<string>;
  readFile(container: string, fileName: string): Promise<Buffer>;
  deleteFile(container: string, fileName: string): Promise<void>;
  getFileUrl(container: string, fileName: string): string;
}
