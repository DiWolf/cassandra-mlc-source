import DependenciasSync from "@domain/entities/DependenciasSync";
import { IDependenciaRepository } from "@domain/repositories/DependenciasSyncRepository";
import { Pool } from "mysql2/promise";

export class MySqlDependenciaRepository implements IDependenciaRepository {
  constructor(private pool: Pool) {}

  async fetchAll(): Promise<DependenciasSync[]> {
    const [rows] = await this.pool.query(
      "SELECT id_dep, colonia, correo, cp, direccion, ext1, lada, municipio, nombre, public, siglas, tel1, titular FROM dependencias"
    );

    return (rows as any[]).map(
      (row) =>
        ({
          id_dep: row.id_dep,
          colonia: row.colonia,
          correo: row.correo,
          cp: row.cp,
          direccion: row.direccion,
          ext1: row.ext1,
          lada: row.lada,
          municipio: row.municipio,
          nombre: row.nombre,
          public: row.public,
          siglas: row.siglas,
          tel1: row.tel1,
          titular: row.titular,
          direaccion: row.direccion
        } as DependenciasSync)
    );
  }
  save(dependencias: DependenciasSync[]): Promise<void> {
    throw new Error("Method not implemented."+dependencias);
  }
}
