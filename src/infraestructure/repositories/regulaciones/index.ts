import CatalogoRegulaciones from "@domain/entities/regulaciones/catalogo_regulaciones.entitie";
import { RegulacionesRepository } from "@domain/repositories/regulaciones/regulaciones";

import { create } from "./actions/create";
import { findAll } from "./actions/findAll";
import { findOne } from "./actions/findone";
import { update } from "./actions/update";
import { FindAllOptions } from "@application/interfaces/FindAllOptions.interface";
import { findAllRegUseCaseWithoutPagination } from "./actions/findAllWithoutPagination";
import { deleteRegulacion } from "./actions/delete";
export class RegulacionesRepositoryImpl implements RegulacionesRepository {
  async created(entry: CatalogoRegulaciones): Promise<CatalogoRegulaciones> {
    return await create(entry);
  }
  async update(entry: CatalogoRegulaciones): Promise<CatalogoRegulaciones> {
    return await update(entry);
  }
  changeStatus(id: string, status: boolean): Promise<string> {
    throw new Error("Method not implemented.");
  }
  async findAll(options: FindAllOptions = {}): Promise<CatalogoRegulaciones[]> {
    return await findAll(options);
  }
  async findOne(id: string): Promise<CatalogoRegulaciones> {
    return await findOne(Number(id));
  }

  async findAllRegUseCaseWithoutPagination(
    options: FindAllOptions = {}
  ): Promise<CatalogoRegulaciones[]> {
    return await findAllRegUseCaseWithoutPagination(options);
  }
  async delete(id: string): Promise<string> {
    return await deleteRegulacion(id);
  }
}
