import DependenciasSync from "@domain/entities/DependenciasSync";
import { IDependenciaRepository } from "@domain/repositories/DependenciasSyncRepository";
import { types } from "cassandra-driver";
export class CassandraDependenciaSyncRepository
  implements IDependenciaRepository
{
  constructor(private client: any) {}

  async fetchAll(): Promise<DependenciasSync[]> {
    throw new Error("Método no implementado.");
  }

  async save(dependencias: DependenciasSync[]): Promise<void> {
    const upsertQuery = `
         INSERT INTO dependencias (colonia, correo, cp,  ext1, id_dep, lada, municipio, nombre, public, siglas, tel1, titular)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
         USING TIMESTAMP ?;
        `;

    const selectQuery = "SELECT id_dep FROM dependencias";

    const markAsFalseQuery = `UPDATE dependencias SET public = ? WHERE id_dep = ?`;

    console.log(`Iniciando sincronización Batch Statement Dependencias...`);

    const timestamp = Date.now() * 1000; //Microsegundos
    // Crear el batchquery

    const batchQueries = dependencias.map((dependencia) => ({
      query: upsertQuery,
      params: [
        dependencia.colonia,
        dependencia.correo,
        dependencia.cp,
        dependencia.ext1,
        dependencia.id_dep,
        dependencia.lada,
        dependencia.municipio,
        dependencia.nombre,
        dependencia.public == true ? true : false,
        dependencia.siglas,
        dependencia.tel1,
        dependencia.titular,
        timestamp,
      ],
    }));

    try {
      await this.client.batch(batchQueries, {
        consistency: types.consistencies.quorum,
      });
      console.log("Sincronización completada con éxito.");
    } catch (error: any) {
      console.error(`Error durante la sicnronización ${error.message}`);
    }
    console.log("Verificando dependencias faltantes...");
    // const selectQuery = "SELECT id_tramite FROM tramites";
    const result = await this.client.execute(selectQuery);
    const existingIds = result.rows.map((row: any) => row.id_dep);
    const incomingIds = dependencias.map((dep: any) => dep.id_dep);

    // Identificar IDs que ya no existen en MariaDB
    const idsToMarkAsFalse = existingIds.filter(
      (id: any) => !incomingIds.includes(id)
    );

    if (idsToMarkAsFalse.length > 0) {
      console.log(
        `Marcando ${idsToMarkAsFalse.length} dependencias como no públicos...`
      );

      for (const id of idsToMarkAsFalse) {
        await this.client.execute(markAsFalseQuery, [false, id]);
      }
    }

    console.log("Sincronización completada.");
  }
}
