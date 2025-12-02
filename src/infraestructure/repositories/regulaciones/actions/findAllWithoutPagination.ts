import { FindAllOptions } from "@application/interfaces/FindAllOptions.interface";
import CatalogoRegulaciones from "@domain/entities/regulaciones/catalogo_regulaciones.entitie";
import pool from "@infraestructure/database/DatabaseConnection";

export async function findAllRegUseCaseWithoutPagination(
  options: FindAllOptions = {}
): Promise<CatalogoRegulaciones[]> {
  const { categoriaId } = options;
  console.log("findAllRegUseCaseWithoutPagination options:", options);

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

if (categoriaId) {
  query += ` AND cr.categoria_id = $1`;
  queryParams.push(categoriaId);
}

query += ` ORDER BY cr.id DESC`;


  try {
    const result = await pool.query(query, queryParams);
    return result.rows as unknown as CatalogoRegulaciones[];
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las regulaciones.");
  }
}
