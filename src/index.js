const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "views")));

//LISTA DE SOCKETS
const socketsOnline = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", (socket) => {
  // Emisión básica
  socket.emit("welcome", "Ahora estás conectado 😎.");

  socket.on("server", (data) => {
    console.log(data);
  });

  // Emisión a todos
  io.emit("everyone", socket.id + " se ha conectado 👀");
});

// RECIBIR EL MENSAJE DEL METODO 'LAST'
socket.on("last", (message) => {
  //POSICIÓN DEL ULTIMO SOCKET
  const lastSocket = socketsOnline[socketsOnline.length - 1];

  //ENVIAR EL MENSAJE
  io.to(lastSocket).emit("salute", message);
});

httpServer.listen(3000);
