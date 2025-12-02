import motivoProtestaCiudadanaDTO from "@application/dtos/protesta-ciudadana/motivo.dto";
import tipoProtestaCiudadanaDTO from "@application/dtos/protesta-ciudadana/tipo.dto";

export interface ProtestaCiudadanaRepository {
  list(): Promise<any[]>;
  find(id: string): Promise<any>;
  create(clave: string, descripcion: string): Promise<string>;
  update(protestaCiudadana: any): Promise<string>;
  delete(id: string): Promise<void>;
  getAllMotivos(): Promise<motivoProtestaCiudadanaDTO[]>;
  getAllTipoProtesta(): Promise<tipoProtestaCiudadanaDTO[]>;
}
