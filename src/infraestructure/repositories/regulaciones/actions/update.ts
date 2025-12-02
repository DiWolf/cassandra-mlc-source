import CatalogoRegulaciones from "@domain/entities/regulaciones/catalogo_regulaciones.entitie";
import pool from "@infraestructure/database/DatabaseConnection";

export async function update(
  entry: CatalogoRegulaciones
): Promise<CatalogoRegulaciones> {
  try {
    const campos = [
      "regulacion",
      "ultima_reforma",
      "ficha_tecnica",
      "categoria_id",
      "fecha_original",
    ];
    const valores: any[] = [
      entry.regulacion,
      entry.ultima_reforma,
      entry.ficha_tecnica,
      entry.categoria_id,
      entry.fecha_original,
    ];

    // Si se proporciona nuevo archivo, lo agregamos al update
    if (entry.descargables) {
      campos.push("descargables");
      valores.push(entry.descargables);
    }

    valores.push(entry.id); // Para el WHERE id = $n

    const setClause = campos
      .map((campo, index) => `${campo} = $${index + 1}`)
      .join(", ");

    const query = `UPDATE catalogo_regulaciones SET ${setClause} WHERE id = $${valores.length}`;

    await pool.query(query, valores);

    const { rows } = await pool.query(
      `SELECT * FROM catalogo_regulaciones WHERE id = $1`,
      [entry.id]
    );

    if (rows.length === 0) {
      throw new Error("No se encontró la regulación actualizada");
    }

    const regulacion = {
      id: rows[0].id,
      regulacion: rows[0].regulacion,
      ultima_reforma: rows[0].ultima_reforma,
      ficha_tecnica: rows[0].ficha_tecnica,
      descargables: rows[0].descargables,
      categoria_id: rows[0].categoria_id,
      fecha_original: rows[0].fecha_original,
      publicada: rows[0].publicada,
    };

    return regulacion;
  } catch (error) {
    console.error(error);
    throw new Error("Error al actualizar la regulación");
  }
}
