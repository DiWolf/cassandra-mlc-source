import CatalogoRegulaciones from "@domain/entities/regulaciones/catalogo_regulaciones.entitie";
import { RegulacionesRepository } from "@domain/repositories/regulaciones/regulaciones";

export class ChangeStatusRegulacionesUseCase {
  constructor(private regulacionesRepository: RegulacionesRepository) {}

  async execute(id: string): Promise<CatalogoRegulaciones> {
    const regulacion = (await this.regulacionesRepository.findOne(
      id
    )) as CatalogoRegulaciones;

    if (!regulacion) {
      throw new Error("Regulacion not found");
    }

    regulacion.publicada = regulacion.publicada === true ? false : true;

    return this.regulacionesRepository.update(regulacion);
  }
}
