import motivoProtestaCiudadanaDTO from "@application/dtos/protesta-ciudadana/motivo.dto";
import pool from "@infraestructure/database/DatabaseConnection";

export async function getAllMotivoProtesta(): Promise<
  motivoProtestaCiudadanaDTO[]
> {
  try {
    const result = await pool.query(`SELECT * FROM motivos_protesta`);
    if (result.rows) {
      return result.rows.map((motivoProtesta) => {
        return {
          idMotivoProtestaCiudadana: motivoProtesta.id,
          motivoProtestaCiudadana: motivoProtesta.motivo,
        };
      });
    }
    return [];
  } catch (error) {
    console.error("Error al obtener todos los registros:", error);
    throw new Error("Error al obtener todos los registros");
  }
}
