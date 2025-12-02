import pool from "@infraestructure/database/DatabaseConnection";
export async function create(
  clave: string,
  descripcion: string
): Promise<string> {
  try {
    await pool.query(
      `
            INSERT INTO tipo_acta_cabildo(clave,descripcion)
            VALUES ($1,$2)
            `,
      [clave, descripcion]
    );

    // logger.info(`Cliente creado con éxito: ${JSON.stringify(client)}`);
    return "Categoria creado con éxito";
  } catch (error) {
    //logger.error("Error al insertar cliente en la base de datos:", error);
    console.log(error)
    // Lanzar excepción para manejarla en niveles superiores
    throw new Error("Error al insertar la categoria en la base de datos");
  }
}
