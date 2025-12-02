import tipoActaCabildo from "@domain/entities/actas-cabildo/cat-actas-cabildo";
import { tipoActaCabildoRepository } from "@domain/repositories/actas-cabildo/tipo-acta-cabildo";

import { create } from "./actions/create";
import { update } from "./actions/update";
import { findAll } from "./actions/findAll";
import { findOne } from "./actions/findOne";
export class CatActasCabildoRepositoryImpl
  implements tipoActaCabildoRepository
{
  async list(): Promise<tipoActaCabildo[]> {
    return await findAll();
  }
  async find(id: number): Promise<tipoActaCabildo> {
    return await findOne(id);
  }
  async create(clave: string, descripcion: string): Promise<string> {
    return await create(clave, descripcion);
  }
  async update(tipoActaCabildo: tipoActaCabildo): Promise<string> {
    return await update(tipoActaCabildo);
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented. "+id);
  }
}
