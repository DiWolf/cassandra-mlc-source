import { FindAllOptions } from "@application/interfaces/FindAllOptions.interface";
import CatalogoRegulaciones from "@domain/entities/regulaciones/catalogo_regulaciones.entitie";
import { RegulacionesRepository } from "@domain/repositories/regulaciones/regulaciones";

export class findAllRegUseCase {
  constructor(private regulacionesRepository: RegulacionesRepository) {}
  async execute(options: FindAllOptions = {}): Promise<CatalogoRegulaciones[]> {
    return this.regulacionesRepository.findAll(options);
  }
}
