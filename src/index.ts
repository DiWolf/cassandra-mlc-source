
import "reflect-metadata";
import dotenv from "dotenv";
import http from "http";
import rateLimit from "express-rate-limit";
import app from "./app";
import { configureSocketServer } from "@infraestructure/frameworks/socket/socketServer";


// Cargar variables de entorno 
dotenv.config();

// Puerto del servidor

const PORT = process.env.PORT || 3000;
// 👇 Esta línea es clave
 app.set('trust proxy', false);
// Configuración de rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 solicitudes por IP
});

app.use(limiter);

// Crear el servidor HTTP
const httpServer = http.createServer(app);

// Configurar Socket.IO
const io = configureSocketServer(httpServer);
app.set("socketio", io); // Hacer que Socket.IO esté disponible globalmente

// Iniciar el servidor
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
