import CatalogoRegulaciones from "@domain/entities/regulaciones/catalogo_regulaciones.entitie";
import { RegulacionesRepository } from "@domain/repositories/regulaciones/regulaciones";

export class CreatedRegUseCase {
  constructor(private regulacionesRepository: RegulacionesRepository) {}
  async execute(entry: CatalogoRegulaciones): Promise<CatalogoRegulaciones> {
    return this.regulacionesRepository.created(entry);
  }
}
