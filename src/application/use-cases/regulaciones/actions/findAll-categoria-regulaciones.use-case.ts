import RegulacionesCategorias from "@domain/entities/regulaciones/regulaciones-categorias.entitie";
import { CategoriasRegulacionesRepository } from "@domain/repositories/regulaciones/cat-regulaciones";

export class findAllCategoriasRegulacionUseCase {
    constructor(private categoriaRegulacionRepository: CategoriasRegulacionesRepository){}
    async execute(): Promise<RegulacionesCategorias[]> {
        return this.categoriaRegulacionRepository.findAll();
    }
}