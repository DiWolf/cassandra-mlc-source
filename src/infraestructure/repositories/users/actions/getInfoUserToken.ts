import Users from "@domain/entities/users/Users";
import pool from "@infraestructure/database/DatabaseConnection";

export async function getInfoUserToken(username: string): Promise<Users | null> {
  try {
    const result = await pool.query(
      `SELECT * FROM usuarios WHERE username = $1 AND status = TRUE`,
      [username]
    );

    if (result.rows.length === 0) {
      return null; // Retorna null si no se encuentra el usuario
    }

    // Mapea correctamente el resultado a la entidad Users
    return result.rows[0] as Users;
  } catch (error) {
    console.error(`Error al obtener el usuario con username=${username}:`, error);
    throw new Error(`Ocurrió un error al obtener el usuario`);
  }
}
