import { FindAllOptions } from "@application/interfaces/FindAllOptions.interface";
import CatalogoRegulaciones from "@domain/entities/regulaciones/catalogo_regulaciones.entitie";
import pool from "@infraestructure/database/DatabaseConnection";

export async function findAll(
  options: FindAllOptions = {}
): Promise<CatalogoRegulaciones[]> {
  const { page = 1, pageSize = 10, categoriaId } = options;

  // Calcula el desplazamiento para la paginación
  const offset = (page - 1) * pageSize;

  // Construcción dinámica de la consulta
  let query = `
    SELECT 
      cr.*, 
      rc.categoria AS nombre_categoria
    FROM 
      catalogo_regulaciones cr
    INNER JOIN 
      regulaciones_categorias rc
    ON 
      cr.categoria_id = rc.id
    WHERE 
      cr.publicada = true
  `;
  const queryParams: any[] = [];

  // Agregar filtro por categoria_id si está presente
  if (categoriaId) {
    query += ` AND cr.categoria_id = $${queryParams.length + 1}`;
    queryParams.push(categoriaId);
  }

  // Agregar paginación
  query += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
  queryParams.push(pageSize, offset);

  try {
    const result = await pool.query(query, queryParams);
    return result.rows as unknown as CatalogoRegulaciones[];
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las regulaciones.");
  }
}