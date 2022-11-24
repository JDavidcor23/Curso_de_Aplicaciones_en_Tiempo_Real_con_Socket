const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");
//SERVER
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

/* TODOS LOS ARCHIVOS QUE VA A LEER NODE Y SE LO VA A 
ENVIAR AL CLIENTE CUANDO HABRA EL LOCALHOST */

app.use(express.static(path.join(__dirname, "/views")));

/* VISTA HTML localhost:3000 */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
io.on("connection", (socket) => {
  // CUANTOS CLIENTES TENGO
  console.log("Clientes conectados: ", socket.engine.clientsCount);

  // CUANDO EL CLIENTE SE DESCONECTA
  socket.on("disconnect", () => {
    console.log("El socket se ha desconactado");
  });

  // DETECTA CADA VEZ QUE PASAMOS DE HTTP LONG-POLLING A SOCKETIO
  socket.conn.once("upgrade", () => {
    console.log("HTTP long-Polling a: ", socket.conn.transport.name);
  });
});

/* PORT */
httpServer.listen(3000);
