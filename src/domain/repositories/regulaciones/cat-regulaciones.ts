import RegulacionesCategorias from "@domain/entities/regulaciones/regulaciones-categorias.entitie";

export interface CategoriasRegulacionesRepository {
  created(entry: RegulacionesCategorias): Promise<string>;
  update(entry: RegulacionesCategorias): Promise<string>;
  findAll(): Promise<RegulacionesCategorias[]>;
  findOne(id: string): Promise<RegulacionesCategorias>;
}
