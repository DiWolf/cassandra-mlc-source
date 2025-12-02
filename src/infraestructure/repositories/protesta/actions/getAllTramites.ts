import TramiteSync from "@domain/entities/TramiteSync";
import CassandraConnection from "@infraestructure/database/CassandraConnection";

export async function getAllTramites(idDep:number): Promise<TramiteSync[]> {
  try {
    const query = `SELECT id_dep,id_tramite,nombre FROM tramites WHERE publico = TRUE  AND id_dep=? ALLOW FILTERING`;
    let params = [idDep];
    let result = await CassandraConnection.execute(query,params);
    return result.rows as unknown as TramiteSync[];
  } catch (error) {
    throw new Error("Error al cargar los trámites");
  }
}
 