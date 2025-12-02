import tipoProtestaCiudadanaDTO from "@application/dtos/protesta-ciudadana/tipo.dto";
import { ProtestaCiudadanaRepository } from "@domain/repositories/protesta-ciudadana/protesta-ciudadana";
import motivoProtestaCiudadanaDTO from "@application/dtos/protesta-ciudadana/motivo.dto";

// Actions
import { getAllTipoProtesta } from "./actions/getAll-tipo-protesta";
import { getAllMotivoProtesta } from "./actions/getAll-motivo-protesta";
export class ProtestaCiudadanaRepositoryImpl
  implements ProtestaCiudadanaRepository
{
  list(): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<any> {
    throw new Error("Method not implemented."+id);
  }
  create(clave: string, descripcion: string): Promise<string> {
    throw new Error("Method not implemented."+clave+descripcion);
  }
  update(protestaCiudadana: any): Promise<string> {
    throw new Error("Method not implemented."+protestaCiudadana);
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented."+id);
  }
  async getAllMotivos(): Promise<motivoProtestaCiudadanaDTO[]> {
    return await getAllMotivoProtesta();
  }
  async getAllTipoProtesta(): Promise<tipoProtestaCiudadanaDTO[]> {
    return await getAllTipoProtesta();
  }
}
