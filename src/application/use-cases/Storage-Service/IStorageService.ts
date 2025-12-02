import { IStorageService } from '@application/interfaces/storage.interface';


export class UploadFileUseCase {
  constructor(private readonly storageService: IStorageService) {}

  async execute(container: string, fileName: string, fileContent: Buffer | string, contentType: string): Promise<string> {
    return await this.storageService.uploadFile(container, fileName, fileContent, contentType);
  }
}
