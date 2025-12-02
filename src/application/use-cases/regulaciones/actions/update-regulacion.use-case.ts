import CatalogoRegulaciones from "@domain/entities/regulaciones/catalogo_regulaciones.entitie";
import { RegulacionesRepository } from "@domain/repositories/regulaciones/regulaciones";

export class UpdateRegUseCase {
  constructor(private regulacionesRepository: RegulacionesRepository) {}
  async execute(
    entry: CatalogoRegulaciones
  ): Promise<CatalogoRegulaciones> {
    const regulacion = await this.regulacionesRepository.update(entry);
    if (!regulacion) {
      throw new Error("Regulación no encontrada");
    }
    return this.regulacionesRepository.update(entry);
  }
}
