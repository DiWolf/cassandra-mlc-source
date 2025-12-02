import Licitaciones from "@domain/entities/Licitaciones";
import pool from "@infraestructure/database/DatabaseConnection";

export async function create(licitacion: Licitaciones): Promise<Licitaciones> {
  try {
    const r = await pool.query(
      `
        INSERT INTO
        licitaciones(
            nombre,
            descripcion,
            vigencia,
            junta_aclaraciones,
            propuestas,
            fallo_adjudicacion,
            ruta
            
    )   VALUES (
        $1, $2, $3, $4, $5, $6, $7
       ) 
          RETURNING *;`,
      [
        licitacion.nombre,
        licitacion.descripcion,
        licitacion.vigencia,
        licitacion.junta_aclaraciones,
        licitacion.propuestas,
        licitacion.fallo_adjudicacion,
        licitacion.archivo,
      ]
    );
    let resultado =  r.rows[0] as unknown as Licitaciones
    console.log(resultado)
    return resultado; // Retorna el registro insertado
    //return `Licitación publicada con éxito`;
  } catch (err) {
    console.error(err);
    throw new Error("Error al crear la licitacion.");
  }
}
