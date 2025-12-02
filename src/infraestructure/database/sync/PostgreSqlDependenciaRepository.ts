import DependenciasSync from "@domain/entities/DependenciasSync";
import { IDependenciaRepository } from "@domain/repositories/DependenciasSyncRepository";
import pool from "@infraestructure/database/DatabaseConnection";
export class PostgreSqlDependenciaRepository implements IDependenciaRepository {
  constructor() {}

  async fetchAll(): Promise<DependenciasSync[]> {
    throw new Error("Not implemented for PostgreSql");
  }

  async save(dependencias: DependenciasSync[]): Promise<void> {
    const upsertQuery = `
    INSERT INTO dependencias (
    id_dep,
    colonia,
    correo,
    cp,
    direccion,
    ext1,
    lada,
    municipio,
    nombre,
    public,
    siglas,
    tel1,
    titular
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    ON CONFLICT (id_dep) DO UPDATE
    SET id_dep = EXCLUDED.id_dep,
        colonia = EXCLUDED.colonia,
        correo = EXCLUDED.correo,
        cp = EXCLUDED.cp,
        direccion = EXCLUDED.direccion,
        ext1 = EXCLUDED.ext1,
        lada = EXCLUDED.lada,
        municipio = EXCLUDED.municipio,
        nombre = EXCLUDED.nombre,
        public = EXCLUDED.public,
        siglas = EXCLUDED.siglas,
        tel1 = EXCLUDED.tel1,
        titular = EXCLUDED.titular;
  `;
    const selectQuery = "SELECT id_dep FROM dependencias";

    const markAsFalseQuery = `
    UPDATE dependencias SET public = $1 WHERE id_dep = $2;`;

    console.log("Iniciando sincronización con transacción...");

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      for (const dependencia of dependencias) {
        await client.query(upsertQuery, [
          dependencia.id_dep,
          dependencia.colonia,
          dependencia.correo,
          dependencia.cp,
          dependencia.direccion,
          dependencia.ext1,
          dependencia.lada,
          dependencia.municipio,
          dependencia.nombre,
          dependencia.public,
          dependencia.siglas,
          dependencia.tel1,
          dependencia.titular,
        ]);
      }
      console.log("Verificando dependencias faltantes...");
      const result = await client.query(selectQuery);
      const existingIds = result.rows.map((row) => row.id_dep);
      const incomingIds = dependencias.map((dependencia) => dependencia.id_dep);
      const idsToMarkAsFalse = existingIds.filter(
        (id) => !incomingIds.includes(id)
      );

      if (idsToMarkAsFalse.length > 0) {
        console.log(
          `Marcando ${idsToMarkAsFalse.length} dependencias como no públicas...`
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
