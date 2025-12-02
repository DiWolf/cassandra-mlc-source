import TipoProstesta from "@domain/entities/TipoProtesta";
import CassandraConnection from "@infraestructure/database/CassandraConnection";

export async function getAllTipoProtesta(): Promise<TipoProstesta[]> {
  try {
    const query = `SELECT id, tipo FROM tipos_protesta WHERE activo = TRUE  ALLOW FILTERING`;
    let result = await CassandraConnection.execute(query);
    return result.rows as unknown as TipoProstesta[];
  } catch (error) {
    throw new Error("Error al cargar los tipos de protesta");
  }
}