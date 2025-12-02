import tipoActaCabildo from "@domain/entities/actas-cabildo/cat-actas-cabildo";
import pool from "@infraestructure/database/DatabaseConnection";

export async function findAll(): Promise<tipoActaCabildo[]> {
  try {
    const result = await pool.query(`SELECT * FROM tipo_acta_cabildo`);

    // Verificar si el resultado tiene filas y convertirlo correctamente
    if (result.rows) {
      return result.rows as tipoActaCabildo[];
    }

    // Si no hay filas, retornar un arreglo vacío
    return [];
  } catch (error) {
    console.error("Error al obtener todos los registros:", error);
    throw new Error("Error al obtener todos los registros");
  }
}
