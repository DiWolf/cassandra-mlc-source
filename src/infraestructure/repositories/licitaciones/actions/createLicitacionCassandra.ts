import cassandraClient from '@infraestructure/database/CassandraConnection';
import Licitaciones from '@domain/entities/Licitaciones';
import { types } from 'cassandra-driver';

export async function create(licitacion: Licitaciones): Promise<Licitaciones> {
    try {
        const query = `
    INSERT INTO licitaciones (
      id, nombre, resumen, vigencia, junta_aclaraciones, propuestas, fallo_adjudicacion,
      fallo_year, ruta_archivo, publicada, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

        const id = types.Uuid.random(); // Generar UUID
        console.log(licitacion.fallo_adjudicacion)
        const falloYear = obtenerAnioDesdeFecha(new Date(licitacion.fallo_adjudicacion).toISOString()); 1
        const createdAt = new Date(); // Fecha actual
        const params = [
            id,                       // id
            licitacion.nombre,              // nombre
            licitacion.descripcion,             // resumen
            licitacion.vigencia,            // vigencia
            licitacion.junta_aclaraciones,  // junta_aclaraciones
            licitacion.propuestas,          // propuestas
            licitacion.fallo_adjudicacion,  // fallo_adjudicacion
            falloYear,                // fallo_year
            licitacion.archivo,        // ruta_archivo
            true,                     // publicada (por defecto true)
            createdAt,                // created_at
        ];

        await cassandraClient.execute(query, params);
        console.log(`Licitación insertada con éxito.`);

        const queryReturn = `SELECT * FROM licitaciones WHERE created_at = ? AND fallo_year = ? AND id = ?`
        const paramReturn = [createdAt, falloYear, id]

        let result = await cassandraClient.execute(queryReturn, paramReturn)
        let r = result.rows[0]
        console.log(`Retornando licitacion ${id}.`);
        return r as unknown as Licitaciones;

    }


    catch (error) {
        console.log(error)
        throw new Error("Error al crear la licitacion.");
    }


}

function obtenerAnioDesdeFecha(fechaISO: string): number {
    const fecha = new Date(fechaISO);
    return fecha.getFullYear();
}