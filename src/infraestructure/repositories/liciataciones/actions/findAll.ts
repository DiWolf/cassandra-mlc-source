import LicitacionesDTO from "@application/dtos/LicitacioneDTO";
import pool from "@infraestructure/database/DatabaseConnection";

export async function findAll(): Promise<LicitacionesDTO[]> {
  try {
    const result = (await pool.query(
      `SELECT * FROM licitaciones`
    )) as {
      rows: any[];
    };
    const licitaciones = result.rows.map((licitacion) => {
      return {
        id: licitacion.id,
        numeroLicitacion: licitacion.numero_licitacion,
        descripcion: licitacion.descripcion_servicios,
        aclaraciones: licitacion.junta_aclaraciones,
        propuestas: licitacion.presentacion_propuestas,
        adjudicacion: licitacion.fallo_adju,
        bases: licitacion.informacion_bases,
        archivo: licitacion.archivo,
        fechaPublicacion: licitacion.fecha_publicacion,
        fechaAdjudicacion: licitacion.fecha_adjudicacion,
        estado: licitacion.publicada,
      };
    });
  
    return licitaciones;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las licitaciones de la base de datos");
  }
}
