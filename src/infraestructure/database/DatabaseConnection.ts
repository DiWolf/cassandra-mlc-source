import { Pool } from "pg";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Opciones adicionales de la conexión, como el timeout, etc.
  ssl: {
    rejectUnauthorized: false, // Acepta certificados no verificados (útil para pruebas locales)
  },
});

export default pool;
