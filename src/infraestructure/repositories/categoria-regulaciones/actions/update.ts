import RegulacionesCategorias from "@domain/entities/regulaciones/regulaciones-categorias.entitie";
import pool from "@infraestructure/database/DatabaseConnection";

export async function update(entry: RegulacionesCategorias): Promise<string> {
  try {
    const result = await pool.query(
      `UPDATE regulaciones_categorias SET categoria = $1 WHERE id = $2`,
      [entry.categoria, entry.id]
    );

    if (result.rowCount === 0) {
      throw new Error("No se encontró la categoría con el ID proporcionado");
    }

    return "Categoría de regulación actualizada con éxito";
  } catch (error) {
    console.error("Error en update:", error);
    throw new Error("Error al actualizar la categoría de regulación");
  }
}
