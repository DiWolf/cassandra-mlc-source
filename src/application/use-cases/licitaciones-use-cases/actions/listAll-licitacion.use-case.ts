import LicitacionesDTO from "@application/dtos/LicitacioneDTO";
import { LicitacionRepository } from "@domain/repositories/licitaciones/licataciones";

export class ListAllLicitacionUseCase {
  constructor(private licitacionRepository: LicitacionRepository) {}
  async execute(): Promise<LicitacionesDTO[]> {
    return await this.licitacionRepository.findAll();
  }
}