import motivoProtestaCiudadanaDTO from "@application/dtos/protesta-ciudadana/motivo.dto";
import { ProtestaCiudadanaRepository } from "@domain/repositories/protesta-ciudadana/protesta-ciudadana";

export class getAllMotivoProtestaCiudadanaUseCase {
  constructor(
    private motivoProtestaCiudadanaRepository: ProtestaCiudadanaRepository
  ) {}
  async execute(): Promise<motivoProtestaCiudadanaDTO[]> {
    return await this.motivoProtestaCiudadanaRepository.getAllMotivos();
  }
}
