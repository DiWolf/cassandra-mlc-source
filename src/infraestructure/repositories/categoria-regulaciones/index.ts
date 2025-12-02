import RegulacionesCategorias from "@domain/entities/regulaciones/regulaciones-categorias.entitie";
import { CategoriasRegulacionesRepository } from "@domain/repositories/regulaciones/cat-regulaciones";

// Importando la función findAll desde el archivo de acciones
import { findaAll } from "./actions/findAll";
import { findById } from "./actions/findone";
import { create } from "./actions/create";
import { update } from './actions/update';

export class CategoriasRegulacionesRepositoryImpl
  implements CategoriasRegulacionesRepository
{
  async created(entry: RegulacionesCategorias): Promise<string> {
    return create(entry);
  }
  async update(entry: RegulacionesCategorias): Promise<string> {
    return await update(entry);
  }
  async findAll(): Promise<RegulacionesCategorias[]> {
    return findaAll();
  }
  async findOne(id: string): Promise<RegulacionesCategorias> {
    return await findById(id);
  }
}
