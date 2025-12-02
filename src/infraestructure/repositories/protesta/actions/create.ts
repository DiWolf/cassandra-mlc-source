import cassandraClient from "@infraestructure/database/CassandraConnection";
import ProtestaCiudadana from "@domain/entities/Protesta";

import { types } from "cassandra-driver";
import { GenerarFolioProtesta } from "@application/use-cases/others/GenerarFolioProtesta";
import { ProtestaRepositoryTotal } from "@infraestructure/repositories/others/ProtestaRepository";

export async function create(protesta: ProtestaCiudadana): Promise<string> {
  try {
    const folioGenerator = new GenerarFolioProtesta();
    const repositoryTotal = new ProtestaRepositoryTotal();
    const fechaActual = new Date();
    // Obtener el consecutivo desde el repositorio
    let consecutivo = await repositoryTotal.obtenerConsecutivoDelMes(
      fechaActual
    );

    // Generar el folio usando las reglas de negocio
    let folio_protesta = await folioGenerator.ejecutar(
      fechaActual,
      consecutivo++
    );

    // Mes y año en que se crea la protesta
    const mesAnio = `${fechaActual.getFullYear()}-${String(
      fechaActual.getMonth() + 1
    ).padStart(2, "0")}`;

    const query = `
            INSERT INTO protesta_ciudadana 
                (id, nombre,
                primer_apellido,
                segundo_apellido,
                correo_electronico,
                tramite_id,
                dependencia_id,
                folio_tramite,
                nombre_servidor_publico,
                tipo_protesta_id,
                descripcion_hecho,
                fecha_de_hechos,
                lugar_hechos, 
                fecha_creacion, 
                folio_protesta, 
                mes_anio, estado_protesta, motivo )
                VALUES 
                (?, ?, ?,?,?,?,?,?,?,?,?,?,?,?, ?,?,?, ?);
        `;
    const id = types.Uuid.random();
    const createdAt = new Date(); // Fecha actual

    const params = [
      id,
      protesta.nombre,
      protesta.primer_apellido,
      protesta.segundo_apellido,
      protesta.correo_electronico,
      protesta.tramite_id,
      protesta.dependencia_id,
      protesta.folio_tramite,
      protesta.nombre_servidor_publico,
      protesta.tipo_protesta_id,
      protesta.descripcion_hecho,
      protesta.fecha_de_hechos,
      protesta.lugar_hechos,
      createdAt,
      folio_protesta,
      mesAnio,
      0,
      protesta.motivo,
    ];

    await cassandraClient.execute(query, params);
    console.log(`Protesta insertada con éxito.`);

    const queryLastInsert = `SELECT folio_protesta FROM protesta_ciudadana WHERE id = ? ALLOW FILTERING;`;
    const result = await cassandraClient.execute(queryLastInsert, [id]);

    return `La protesta se creó con éxito. Folio: ${result.rows[0].folio_protesta}`;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear la protesta.");
  }
}
