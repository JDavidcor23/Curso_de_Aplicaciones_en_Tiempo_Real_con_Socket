const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", (socket) => {
  //SOCKET NOS PERMITE CREAR NUESTROS PROPIOS METODOS
  //ESTA PROPIEDAD CUSTOM NOS AYUDA A SABER EN QUE SALA ESTA CONECTADO
  socket.connectedRoom = "";

  //RECIBO LA SALA
  socket.on("connect to room", (room) => {
    //DESCONECTA DE LA SALA ANTERIOR AL USUARIO
    socket.leave(socket.connectedRoom);

    switch (room) {
      //QUE SALA ME QUIERO CONECTAR
      case "room1":
        //METODO JOIN METE AL EL SOCKET QUE ESTA ENVIANDO A X SALE EN ESTE CASO ROOM1
        //SI LA SALA NO EXISTE LO VA A CREAR AUTOMATICAMENTE
        socket.join("room1");
        //MODIFICAMOS LA VARIABLE PARA INDICAR EN QUE SALA ESTOY
        socket.connectedRoom = "room1";
        break;

      case "room2":
        socket.join("room2");
        socket.connectedRoom = "room2";
        break;

      case "room3":
        socket.join("room3");
        socket.connectedRoom = "room3";
        break;
    }
  });

  // OBTENGO EL MENSAJE DEL FORNT
  socket.on("message", (message) => {
    // OBTENGO LA SALA
    const room = socket.connectedRoom;

    // ENVIO EL MENSAJE A LA SALA
    io.to(room).emit("send message", {
      message,
      room,
    });
  });
});

httpServer.listen(3000);
