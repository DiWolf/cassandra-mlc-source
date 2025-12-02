import pool from "@infraestructure/database/DatabaseConnection";

export async function findOne(id: number): Promise<any> {
    const query = `
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
        cr.id = $1 AND cr.publicada = true
    `;
    
    try {
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
        throw new Error("Regulación no encontrada o no publicada.");
        }
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error("Error al obtener la regulación.");
    }
}