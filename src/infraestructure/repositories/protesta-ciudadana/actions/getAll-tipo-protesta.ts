import tipoProtestaCiudadanaDTO from "@application/dtos/protesta-ciudadana/tipo.dto";
import pool from "@infraestructure/database/DatabaseConnection";

export async function getAllTipoProtesta(): Promise<
  tipoProtestaCiudadanaDTO[]
> {
  try {
    const result = await pool.query(`SELECT * FROM tipo_protesta`);

    // Verificar si el resultado tiene filas y convertirlo correctamente
    if (result.rows) {
      return result.rows.map((tipoProtesta) => {
        return {
          idTipoProtestaCiudadana: tipoProtesta.id,
          tipoProtestaCiudadana: tipoProtesta.tipo,
        };
      });
    }

    // Si no hay filas, retornar un arreglo vacío
    return [];
  } catch (error) {
    console.error("Error al obtener todos los registros:", error);
    throw new Error("Error al obtener todos los registros");
  }
}
