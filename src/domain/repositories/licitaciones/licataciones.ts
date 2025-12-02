import LicitacionesDTO from "@application/dtos/LicitacioneDTO";

export interface LicitacionRepository {
  created(entry: LicitacionesDTO): Promise<LicitacionesDTO>;
  update(entry: LicitacionesDTO): Promise<string>;
  changeStatus(id: string, status: boolean): Promise<string>;
  findAll(): Promise<LicitacionesDTO[]>;
  findOne(id: string): Promise<LicitacionesDTO>;
}
