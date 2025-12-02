import RegulacionesCategorias from "@domain/entities/regulaciones/regulaciones-categorias.entitie";
import pool from "@infraestructure/database/DatabaseConnection";

export async function findaAll(): Promise<RegulacionesCategorias[]> {
  try {
    let query = `SELECT * FROM regulaciones_categorias`;
    const result = await pool.query(query);

    return result.rows as unknown as RegulacionesCategorias[];
  } catch (error) {
    throw new Error("Imposible obtener las categorias de las regulaciones.");
  }
}
