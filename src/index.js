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

// MIDDLEWARE PARA DETERMINAR SI ESTÁ AUTENTICADO O NO
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (token == "Mr. Michi es genial") {
    next();
  } else {
    const err = new Error("No puedes pasar >:c");
    err.data = {
      details: "No pudiste ser autenticado",
    };

    next(err);
  }
});
//PODEMOS PONER VARIOS MIDDLEWARES
io.use((socket, next) => {
  next();
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

httpServer.listen(3000);
