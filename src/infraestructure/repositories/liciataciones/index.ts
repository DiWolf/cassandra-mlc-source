import LicitacionesDTO from "@application/dtos/LicitacioneDTO";
import { LicitacionRepository } from "@domain/repositories/licitaciones/licataciones";

import { create } from "./actions/create";
import { findAll } from "./actions/findAll";
export class LicitacionRepositoryImpl implements LicitacionRepository {
  async created(entry: LicitacionesDTO): Promise<LicitacionesDTO> {
    return await create(entry);
  }
  update(entry: LicitacionesDTO): Promise<string> {
    throw new Error("Method not implemented." + entry);
  }
  changeStatus(id: string, status: boolean): Promise<string> {
    throw new Error("Method not implemented." + id + status);
  }
  async findAll(): Promise<LicitacionesDTO[]> {
    return await findAll();
  }
  findOne(id: string): Promise<LicitacionesDTO> {
    throw new Error("Method not implemented." + id);
  }

  uploadPdf(pdfPath: string): Promise<{ [key: string]: string | null }> {
    throw new Error("Method not implemented." + pdfPath);
  }
}
