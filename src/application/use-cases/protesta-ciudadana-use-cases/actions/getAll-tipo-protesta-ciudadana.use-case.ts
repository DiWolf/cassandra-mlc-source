import tipoProtestaCiudadanaDTO from "@application/dtos/protesta-ciudadana/tipo.dto";
import { ProtestaCiudadanaRepository } from "@domain/repositories/protesta-ciudadana/protesta-ciudadana";

export class getAllTipoProtestaCiudadanaUseCase {
  constructor(
    private tipoProtestaCiudadanaRepository: ProtestaCiudadanaRepository
  ) {}
  async execute(): Promise<tipoProtestaCiudadanaDTO[]> {
    return await this.tipoProtestaCiudadanaRepository.getAllTipoProtesta();
  }
}
