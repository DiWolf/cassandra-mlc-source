import { FindAllOptions } from "@application/interfaces/FindAllOptions.interface";
import CatalogoRegulaciones from "@domain/entities/regulaciones/catalogo_regulaciones.entitie";

export interface RegulacionesRepository {
  created(entry: CatalogoRegulaciones): Promise<CatalogoRegulaciones>;
  update(entry: CatalogoRegulaciones): Promise<CatalogoRegulaciones>;
  changeStatus(id: string, status: boolean): Promise<string>;
  findAll(options: FindAllOptions): Promise<CatalogoRegulaciones[]>;
  findAllRegUseCaseWithoutPagination(): Promise<CatalogoRegulaciones[]>;
  findOne(id: string): Promise<CatalogoRegulaciones>;
  delete(id: string): Promise<string>;
}
