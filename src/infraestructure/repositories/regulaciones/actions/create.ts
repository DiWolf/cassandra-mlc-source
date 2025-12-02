import CatalogoRegulaciones from "@domain/entities/regulaciones/catalogo_regulaciones.entitie";
import pool from "@infraestructure/database/DatabaseConnection";

export async function create(
  entry: CatalogoRegulaciones
): Promise<CatalogoRegulaciones> {
  try {
    await pool.query(
      `INSERT INTO catalogo_regulaciones (
            regulacion,
            ultima_reforma,
            ficha_tecnica,
            descargables,
            categoria_id,
            fecha_original
            )
        VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        entry.regulacion,
        entry.ultima_reforma,
        entry.ficha_tecnica,
        entry.descargables,
        entry.categoria_id,
        entry.fecha_original,
      ]
    );
    const { rows } = await pool.query(
      `
        SELECT * FROM catalogo_regulaciones WHERE regulacion = $1
        `,
      [entry.regulacion]
    );
    if (rows.length === 0) {
      throw new Error("No se encontró el registro creado");
    }
    const regulaciones = {
      id: rows[0].id,
      regulacion: rows[0].regulacion,
      ultima_reforma: rows[0].ultima_reforma,
      ficha_tecnica: rows[0].ficha_tecnica,
      descargables: rows[0].descargables,
      categoria_id: rows[0].categoria_id,
      fecha_original: rows[0].fecha_original,
      publicada: rows[0].publicada,
    };
    return regulaciones;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear la regulación");
  }
}
