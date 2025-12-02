// modulos externos
import bcrypt from "bcryptjs";

import cassandraClient from '@infraestructure/database/CassandraConnection';
import { types } from 'cassandra-driver'

import Usuarios from "@domain/entities/Usuarios";

export async function create(usuario: Usuarios): Promise<String> {
    try {

        const hashedPassword = await bcrypt.hash(usuario.password, 10);

        // Ejecuta la consulta para insertar el nuevo registro 
        // Verifica que el resultado tenga filas y retorna el nombre de usuario
        const query = `
    INSERT INTO usuarios (
      id, username, employee_number, department, password, role, status, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `;

        // Parámetros para la consulta
        const params = [
            types.Uuid.random(), // Genera un UUID para el campo `id`
            usuario.username,                        // Nombre de usuario
            usuario.employee_number,                      // Número de empleado
            usuario.department,               // Departamento
            hashedPassword,             // Contraseña
            usuario.role,                       // Rol del usuario
            true,                          // Estado activo
            new Date(),                    // Fecha de creación (ahora)
            new Date(),                    // Fecha de actualización (ahora)
        ];


        await cassandraClient.execute(query, params);
        console.log("Usuario insertado con éxito.");
        return "Usuario creado con éxito"
    }
    catch (error) {
        throw new Error("Error al crear el usuarios.")
    }
    
}