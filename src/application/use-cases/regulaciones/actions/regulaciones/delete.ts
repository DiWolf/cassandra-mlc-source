import { RegulacionesRepository } from "@domain/repositories/regulaciones/regulaciones";

export class deleteRegulacionUseCase {
  constructor(private regulacionesRepository: RegulacionesRepository) {}

  async execute(id: string): Promise<string> {
    return this.regulacionesRepository.delete(id);
  }
}