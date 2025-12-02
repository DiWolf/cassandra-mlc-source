import RegulacionesCategorias from "@domain/entities/regulaciones/regulaciones-categorias.entitie";
import pool from "@infraestructure/database/DatabaseConnection";

export async function findById(id: string): Promise<RegulacionesCategorias> {
  try {
    const query = `SELECT * FROM regulaciones_categorias WHERE id = $1`;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error(`Categoría con id ${id} no encontrada.`);
    }

    return result.rows[0] as RegulacionesCategorias;
  } catch (error) {
    throw new Error(`No se pudo obtener la categoría con id ${id}.`);
  }
}
