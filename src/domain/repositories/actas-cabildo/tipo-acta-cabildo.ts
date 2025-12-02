import tipoActaCabildo from "@domain/entities/actas-cabildo/cat-actas-cabildo";
export interface tipoActaCabildoRepository {
  list(): Promise<tipoActaCabildo[]>;
  find(id: number): Promise<tipoActaCabildo>;
  create(clave: string, descripcion: string): Promise<string>;
  update(tipoActaCabildo: tipoActaCabildo): Promise<string>;
  delete(id: number): Promise<void>;
}
