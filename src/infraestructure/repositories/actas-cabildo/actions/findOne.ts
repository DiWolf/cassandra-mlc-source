import tipoActaCabildo from "@domain/entities/actas-cabildo/cat-actas-cabildo";
import pool from "@infraestructure/database/DatabaseConnection";

export async function findOne(id: number): Promise<tipoActaCabildo> {
  try {
    const result = await pool.query(
      `SELECT * FROM tipo_acta_cabildo WHERE id = $1 LIMIT 1`,
      [id]
    );

    // Verificar si se encontró un registro
    if (result.rows && result.rows.length > 0) {
      return result.rows[0] as tipoActaCabildo;
    }

    throw new Error(`Registro con id=${id} no encontrado`);
  } catch (error) {
    console.error(`Error al obtener el registro con id=${id}:`, error);
    throw new Error("Error al obtener el registro");
  }
}
