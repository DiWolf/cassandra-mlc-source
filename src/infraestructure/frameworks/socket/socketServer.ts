import { Server } from "socket.io";

export const configureSocketServer = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Permitir todos los orígenes
    },
  });

  io.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });

  return io;
};
