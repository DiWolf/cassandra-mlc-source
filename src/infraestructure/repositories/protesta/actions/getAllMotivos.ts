import MotivosProtesta from "@domain/entities/MotivosProtesta";
import CassandraConnection from "@infraestructure/database/CassandraConnection";

export async function getAllMotivos(): Promise<MotivosProtesta[]> {
  try {
    const query = `SELECT id, nombre FROM motivos_protesta WHERE activo = TRUE  ALLOW FILTERING`;
    let result = await CassandraConnection.execute(query);
    return result.rows as unknown as MotivosProtesta[];
  } catch (error) {
    throw new Error("Error al cargar los motivos");
  }
}
