import bcrypt from "bcryptjs";

import Users from "@domain/entities/users/Users";
import pool from "@infraestructure/database/DatabaseConnection";

export async function create(user: Users): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await pool.query(
      `
    INSERT INTO usuarios (username,
employee_number,
department,
password,
role)
VALUES($1,$2,$3,$4,$5)
        `,
      [
        user.username,
        user.employee_number,
        user.department,
        hashedPassword,
        user.role,
      ]
    );
    return "Usuario creado con éxito";
  } catch (error) {
    //logger.error("Error al insertar cliente en la base de datos:", error);
    console.log(error);
    // Lanzar excepción para manejarla en niveles superiores
    throw new Error("Error al insertar el usuario en la base de datos");
  }
}
