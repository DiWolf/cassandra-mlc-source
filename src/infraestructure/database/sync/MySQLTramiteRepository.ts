import { ITramiteRepository } from "@domain/repositories/TramitesSyncRepository";
import TramiteSync from "@domain/entities/TramiteSync";
import { Pool } from "mysql2/promise";

export class MySQLTramiteRepository implements ITramiteRepository {
  constructor(private pool: Pool) {}

  async fetchAll(): Promise<TramiteSync[]> {
    const [rows] = await this.pool.query(
      "SELECT id_dep, id_tramite, nombre, publico FROM tramites"
    );
    return (rows as any[]).map(
      (row) =>
        ({
          id_dep: row.id_dep,
          id_tramite: row.id_tramite,
          nombre: row.nombre,
          publico: row.publico,
        } as TramiteSync) // Esto cumple con la interfaz
    );
  }

  async save(): Promise<void> {
    throw new Error("Not implemented for MySQL");
  }
}
