import RegulacionesCategorias from "@domain/entities/regulaciones/regulaciones-categorias.entitie";
import { CategoriasRegulacionesRepository } from "@domain/repositories/regulaciones/cat-regulaciones";

export class FindOneCategoriaRegulacionUseCase {
  constructor(
    private regulacionesRepository: CategoriasRegulacionesRepository
  ) {}

  async execute(id: string): Promise<RegulacionesCategorias> {
    return this.regulacionesRepository.findOne(id);
  }
}
