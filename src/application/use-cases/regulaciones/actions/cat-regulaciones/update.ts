import RegulacionesCategorias from "@domain/entities/regulaciones/regulaciones-categorias.entitie";
import { CategoriasRegulacionesRepository } from "@domain/repositories/regulaciones/cat-regulaciones";

export class UpdateCategoriaRegulacionUseCase {
  constructor(private regulacionesRepository: CategoriasRegulacionesRepository) {}

  async execute(entry: RegulacionesCategorias): Promise<string> {
    return this.regulacionesRepository.update(entry);
  }
}