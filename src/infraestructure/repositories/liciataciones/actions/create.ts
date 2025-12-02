import LicitacionesDTO from "@application/dtos/LicitacioneDTO";
import pool from "@infraestructure/database/DatabaseConnection";

export async function create(entry: LicitacionesDTO): Promise<LicitacionesDTO> {
  try {
    // Realizar el INSERT
    await pool.query(
      `INSERT INTO licitaciones (
        numero_licitacion,
        descripcion_servicios,
        junta_aclaraciones,
        presentacion_propuestas,
        fallo_adju,
        informacion_bases,
        archivo, 
        fecha_publicacion, 
        fecha_adjudicacion,
        publicada
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)`,
      [
        entry.numeroLicitacion,
        entry.descripcion,
        entry.aclaraciones,
        entry.propuestas,
        entry.adjudicacion,
        entry.bases,
        entry.archivo, // Aquí solo se guarda el nombre del archivo
        entry.fechaPublicacion,
        entry.fechaAdjudicacion,
      ]
    );

    // Realizar el SELECT para retornar el registro recién creado
    const { rows } = await pool.query(
      `SELECT * FROM licitaciones WHERE numero_licitacion = $1`,
      [entry.numeroLicitacion]
    );

    // Verificar que el registro exista
    if (rows.length === 0) {
      throw new Error("No se encontró el registro creado");
    }

    const licitaciones = {
      id: rows[0].id,
      numeroLicitacion: rows[0].numero_licitacion,
      descripcion: rows[0].descripcion_servicios,
      aclaraciones: rows[0].junta_aclaraciones,
      propuestas: rows[0].presentacion_propuestas,
      adjudicacion: rows[0].fallo_adju,
      bases: rows[0].informacion_bases,
      archivo: rows[0].archivo,
      fechaPublicacion: rows[0].fecha_publicacion,
      fechaAdjudicacion: rows[0].fecha_adjudicacion,
      estado: rows[0].publicada,
    };

    return licitaciones; // Devolver el registro creado
  } catch (error) {
    console.log(error);
    throw new Error("Error al insertar la licitación en la base de datos");
  }
}
