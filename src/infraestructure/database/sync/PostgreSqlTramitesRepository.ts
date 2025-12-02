import TramiteSync from "@domain/entities/TramiteSync";
import { ITramiteRepository } from "@domain/repositories/TramitesSyncRepository";
import pool from "@infraestructure/database/DatabaseConnection";

export class PostgreSqlTramitesRepository implements ITramiteRepository {
  constructor() {}

  async fetchAll(): Promise<TramiteSync[]> {
    throw new Error("Not implemented for PostgreSql");
  }

  async save(tramites: TramiteSync[]): Promise<void> {
    const upsertQuery = `
    INSERT INTO tramites_dependencias (id_tramite, id_dep, nombre, es_publico, updated_at)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (id_tramite,id_dep) DO UPDATE
    SET id_dep = EXCLUDED.id_dep,
        nombre = EXCLUDED.nombre,
        es_publico = EXCLUDED.es_publico,
        updated_at = EXCLUDED.updated_at;
  `;
    const selectQuery = "SELECT id_tramite FROM tramites_dependencias";

    const markAsFalseQuery = `
    UPDATE tramites_dependencias
    SET publico = $1
    WHERE id_tramite = $2;
  `;

    console.log("Iniciando sincronización con transacción...");

    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      const timestamp = new Date();
      for (const tramite of tramites) {
        await client.query(upsertQuery, [
          tramite.id_tramite,
          tramite.id_dep,
          tramite.nombre,
          tramite.es_publico,
          timestamp,
        ]);
      }

      console.log("Verificando trámites faltantes...");

      const result = await client.query(selectQuery);
      const existingIds = result.rows.map((row) => row.id_tramite);
      const incomingIds = tramites.map((tramite) => tramite.id_tramite);

      // Identificar IDs que ya no existen en la nueva lista
      const idsToMarkAsFalse = existingIds.filter(
        (id) => !incomingIds.includes(id)
      );

      if (idsToMarkAsFalse.length > 0) {
        console.log(
          `Marcando ${idsToMarkAsFalse.length} trámites como no públicos...`
        );
        for (const id of idsToMarkAsFalse) {
          await client.query(markAsFalseQuery, [false, id]);
        }
      }

      await client.query("COMMIT");
      console.log("Sincronización completada.");
    } catch (error: any) {
      await client.query("ROLLBACK");
      console.error("Error durante la sincronización:", error.message);
    } finally {
      client.release();
    }
  }
}
