import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'admi',
  database: process.env.MYSQL_DATABASE || 'notas',
  port: parseInt(process.env.MYSQL_PORT) || 3300, 
  waitForConnections: process.env.MYSQL_WAIT_FOR_CONNECTIONS === 'true' || true,
  connectionLimit: 10,
  queueLimit: 0
});
