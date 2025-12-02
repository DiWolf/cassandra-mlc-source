import Licitaciones from "@domain/entities/Licitaciones";
import pool from "@infraestructure/database/DatabaseConnection";

export async function getAll(
  pagina: number,
  limite: number,
  anio: number
): Promise<Licitaciones[]> {
  try {
    const offset = (pagina - 1) * limite;
    const query = `SELECT * FROM licitaciones WHERE EXTRACT(YEAR FROM fallo_adjudicacion)  =  $1 ORDER BY created_at DESC  LIMIT $2 OFFSET $3 ;`;

    const { rows } = await pool.query(query, [anio, limite, offset]);
    console.log(rows);
    return rows as unknown as Licitaciones[];
  } catch (error) {
    console.error("Error al obtener las licitaciones:", error);
    throw new Error("Error al obtener las licitaciones");
  }
}
