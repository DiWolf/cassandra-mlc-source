import CatalogoRegulaciones from "@domain/entities/regulaciones/catalogo_regulaciones.entitie";
import { RegulacionesRepository } from "@domain/repositories/regulaciones/regulaciones";

export class findOneRegUseCase {
  constructor(private regulacionesRepository: RegulacionesRepository) {}
  async execute(id: string): Promise<CatalogoRegulaciones> {
    return this.regulacionesRepository.findOne(id);
  }
}
