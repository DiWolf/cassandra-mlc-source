import { ITramiteRepository } from "@domain/repositories/TramitesSyncRepository";
import TramiteSync from "@domain/entities/TramiteSync";
import { types } from "cassandra-driver";

export class CassandraTramiteRepository implements ITramiteRepository {
  constructor(private client: any) {}

  async fetchAll(): Promise<TramiteSync[]> {
    throw new Error("Not implemented for Cassandra");
  }

  async save(tramites: TramiteSync[]): Promise<void> {
    const upsertQuery = `
  INSERT INTO tramites (id_tramite, id_dep, nombre, publico)
  VALUES (?, ?, ?, ?)
  USING TIMESTAMP ?;
`;

    const selectQuery = "SELECT id_tramite FROM tramites";

    const markAsFalseQuery = `
  UPDATE tramites
  SET publico = ?
  WHERE id_tramite = ?
`;

    console.log("Iniciando sincronización con Batch Statement...");

    const timestamp = Date.now() * 1000; // Microsegundos
    // Crear batchQueries
    const batchQueries = tramites.map((tramite) => ({
      query: upsertQuery,
      params: [
        tramite.id_tramite,
        tramite.id_dep,
        tramite.nombre,
        tramite.publico == true ? true : false, // Conversión explícita a booleano
        timestamp,
      ],
    }));

    try {
      await this.client.batch(batchQueries, {
        consistency: types.consistencies.quorum,
      });
      console.log("Sincronización completada con éxito.");
    } catch (error: any) {
      console.error("Error durante la sincronización:", error.message);
    }

    console.log("Verificando trámites faltantes...");
    // const selectQuery = "SELECT id_tramite FROM tramites";
    const result = await this.client.execute(selectQuery);
    // result.rows.map((row: any) => {
    //   console.log(row.id_tramite);
    // });
    const existingIds = result.rows.map((row: any) => row.id_tramite);

    const incomingIds = tramites.map((tramite: any) => tramite.id_tramite);

    // Identificar IDs que ya no existen en MariaDB
    const idsToMarkAsFalse = existingIds.filter(
      (id: any) => !incomingIds.includes(id)
    );

    if (idsToMarkAsFalse.length > 0) {
      console.log(
        `Marcando ${idsToMarkAsFalse.length} trámites como no públicos...`
      );

      for (const id of idsToMarkAsFalse) {
        await this.client.execute(markAsFalseQuery, [false, id]);
      }
    }

    console.log("Sincronización completada.");
  }
}
