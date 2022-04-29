"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: { origin: "http://localhost:3000" }
});
io.on("connection", (socket) => {
    let nombre;
    socket.on("conectado", (nomb) => {
        nombre = nomb;
        //socket.broadcast.emit mensaje a todos excepto al que ha enviado el mensaje
        socket.broadcast.emit("mensajes", {
            nombre: nombre,
            mensaje: `${nombre} ha entrado en la sala del chat`,
        });
    });
    socket.on("mensaje", (nombre, mensaje) => {
        //io.emit mensaje a todos los conectados al chat
        io.emit("mensajes", { nombre, mensaje });
    });
    socket.on("disconnect", () => {
        io.emit("mensajes", {
            server: "server",
            mensaje: `${nombre} ha abandonado la sala`,
        });
    });
});
//**************************************************************
httpServer.listen(config_1.default.PORT, () => {
    console.log(`socket on http://${config_1.default.HOST}:${config_1.default.PORT}`);
});
exports.default = httpServer;
