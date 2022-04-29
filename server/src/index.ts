import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import keys from "./config";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  let name: string;

  socket.on("conectado", (nomb) => {
    name = nomb;
    //socket.broadcast.emit message a todos excepto al que ha enviado el mensaje
    socket.broadcast.emit("message", {
      name: name,
      message: `${name} ha entrado en la sala del chat`,
    });
  });

  socket.on("message", (name, mensaje) => {
    //io.emit message a todos los conectados al chat
    io.emit("message", { name, mensaje });
  });

  socket.on("disconnect", () => {
    io.emit("message", {
      server: "server",
      message: `${name} ha abandonado la sala`,
    });
  });
});

//		APP MAIN

httpServer.listen(keys.PORT, () => {
  console.log(`socket on http://${keys.HOST}:${keys.PORT}`);
});

export default httpServer;
