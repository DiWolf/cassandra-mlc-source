import RegulacionesCategorias from "@domain/entities/regulaciones/regulaciones-categorias.entitie";
import pool from "@infraestructure/database/DatabaseConnection";

export async function create(entry: RegulacionesCategorias): Promise<string> {
  try {
    const result = await pool.query(`INSERT INTO regulaciones_categorias (categoria) VALUES ($1)`, [entry.categoria]);
    return "Categoría de regulación creada con éxito";
  } catch (error) {
    console.error("Error en create:", error);
    throw new Error("Error al crear la categoría de regulación");
  }
}