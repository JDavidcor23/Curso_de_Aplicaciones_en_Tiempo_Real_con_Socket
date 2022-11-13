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
/*CUANDO HABRAN LA RUTA */
io.on("connection", (socket) => {
  console.log(socket.id);
});

/* PORT */
httpServer.listen(3000);
