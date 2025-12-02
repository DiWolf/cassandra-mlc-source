import pool from "@infraestructure/database/DatabaseConnection";

export async function deleteRegulacion(id: string): Promise<string> {
  try {
    const query = `DELETE FROM catalogo_regulaciones WHERE id = $1 RETURNING id`;
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      throw new Error("No se encontró la regulación para eliminar");
    }
    return rows[0].id;
  } catch (error: any) {
    console.error("Error en deleteRegulacion:", error.message);
    throw new Error("Error al eliminar la regulación");
  }
}
