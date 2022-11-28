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

//CUANDO HACEMOS ESTO EL SOCKET SE CONECTA DE MANERA AUTOMATICA 'DEFAULT'

/* io.on("connection", socket => {
}); */

//CREAMOS LOS NAMESPACES
const teachers = io.of("teachers");
const students = io.of("students");

//EMPEZAMOS A ESCUCHAR
teachers.on("connection", (socket) => {
  console.log(socket.id + " se ha conectado a la sala de profes");

  //LO ESCUCHA
  //ESTE SOCKET.ON ES EL SOCKET QUE ESTA EN LOS PARENTESIS
  socket.on("send message", (data) => {
    //LO ENVIA
    teachers.emit("message", data);
  });
});

//EMPEZAMOS A ESCUCHAR
students.on("connection", (socket) => {
  console.log(socket.id + " se ha conectado a la sala de estudiantes");

  socket.on("send message", (data) => {
    students.emit("message", data);
  });
});

httpServer.listen(3000);
