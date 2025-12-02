import DependenciasSync from "@domain/entities/DependenciasSync";
import CassandraConnection from "@infraestructure/database/CassandraConnection";

export async function getAllDependencias(): Promise<DependenciasSync[]> {
  try {
    const query = `SELECT id_dep, nombre FROM dependencias WHERE public = TRUE  ALLOW FILTERING`;
    let result = await CassandraConnection.execute(query);
    return result.rows as unknown as DependenciasSync[];
  } catch (error) {
    throw new Error("Error al cargar las dependencias");
  }
}
