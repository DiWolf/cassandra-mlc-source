import tipoActaCabildo from "@domain/entities/actas-cabildo/cat-actas-cabildo";
import pool from "@infraestructure/database/DatabaseConnection";

export async function update(input: tipoActaCabildo): Promise<string> {
  try {
    await pool.query(
      `
            UPDATE tipo_acta_cabildo
            SET  clave = $2,descripcion = $3
            WHERE id = $1
            `,
      [input.id, input.clave, input.descripcion]
    );

    // logger.info(`Categoria actualizada con éxito: ${JSON.stringify(input)}`);
    return "Categoría actualizada con éxito";
  } catch (error) {
    //logger.error("Error al actualizar la categoría en la base de datos:", error);
    console.log(error);
    // Lanzar excepción para manejarla en niveles superiores
    throw new Error("Error al actualizar la categoría en la base de datos");
  }
}
