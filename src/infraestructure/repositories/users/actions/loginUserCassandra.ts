import Usuarios from "@domain/entities/Usuarios";
import CassandraConnection from "@infraestructure/database/CassandraConnection";

export async function execute(nombreUsuario: string): Promise<Usuarios | null> {
    try {

        const query = `SELECT * FROM usuarios WHERE username = ?`
        const params = [nombreUsuario]
        const result = await CassandraConnection.execute(query, params)
        let r = result.rows[0]
        return r as unknown as Usuarios;
    } catch (error) {
        throw new Error(`Error en el servidor`)
    }

}
