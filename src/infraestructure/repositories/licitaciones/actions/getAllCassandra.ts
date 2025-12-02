import Licitaciones from "@domain/entities/Licitaciones";
import cassandraClient from "@infraestructure/database/CassandraConnection";

export async function getAll(
  limite: number,
  anio: number,
  pageState?: string
): Promise<{ data: Licitaciones[]; nextPageState: string | null }> {
  try {
    const query = `
      SELECT id, nombre, descripcion, observaciones, junta_aclaraciones, propuestas, 
             fallo_adjudicacion, fallo_year, archivo, publicada, created_at
      FROM licitaciones 
      WHERE fallo_year = ? 
      ORDER BY created_at DESC 
      LIMIT ?;
    `;

    const params = [anio, limite];

    const result = await cassandraClient.execute(query, params, {
      prepare: true,
      fetchSize: Math.min(limite, 5), // Configuración para forzar paginación
      pageState: pageState || undefined,
    });

    // Log para depuración
    console.log("Result PageState:", result.pageState);
    console.log("Number of Rows:", result.rows.length);

    const rows = result.rows.map((row: any) => ({
      id: row.id.toString(),
      nombre: row.nombre,
      descripcion: row.descripcion,
      vigencia: row.observaciones,
      junta_aclaraciones: row.junta_aclaraciones,
      propuestas: row.propuestas,
      fallo_adjudicacion: row.fallo_adjudicacion,
      fallo_year: row.fallo_year,
      archivo: row.archivo,
      publicada: row.publicada,
      created_at: row.created_at,
    }));

    return {
      data: rows,
      nextPageState: result.pageState || null, // Devuelve null si no hay más páginas
    };
  } catch (error) {
    console.error("Error al obtener las licitaciones:", error);
    throw new Error("Error al obtener las licitaciones");
  }
}
