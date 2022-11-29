//ESTO ES UNA FUNCION QUE RECIBE EL HTTPSERVER

module.exports = (httpServer) => {
  const { Server } = require("socket.io");
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(socket.id);
  });
};
