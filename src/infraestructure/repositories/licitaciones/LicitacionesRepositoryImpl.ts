import Licitaciones from "@domain/entities/Licitaciones";
import { LicitacionesRepository } from "@domain/repositories/LicitacionesRepository";

// Acciones
//  import { getAll } from "./actions/getAll";
// import { create } from './actions/create';
import { create } from './actions/createLicitacionCassandra'
import { getAll } from './actions/getAllCassandra'
export class LicitacionesRepositoryImpl implements LicitacionesRepository {
  async create(licitacion: Licitaciones): Promise<Licitaciones> {
    return await create(licitacion)
  }
  async getAll(
    limite: number,
    anio: number,
    pageState?: string // Estado de paginación
  ): Promise<{ data: Licitaciones[]; nextPageState: string | null }> {
    return await getAll(limite, anio, pageState);
  }
}
