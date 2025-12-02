import mysql, { Pool } from 'mysql2/promise';

const poolMysql: Pool = mysql.createPool({
    host: process.env.MYSQL_DB_HOST,
    port: parseInt(process.env.MYSQL_DB_PORT as string, 10) || 3306,
    user: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    waitForConnections: true, // Espera si el pool está lleno
    connectionLimit: 10, // Límite de conexiones
    queueLimit: 0, // Sin límite en la cola
  });
  
  export default poolMysql;