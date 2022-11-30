//ESTO ES UNA FUNCION QUE RECIBE EL HTTPSERVER

module.exports = (httpServer) => {
  const { Server } = require("socket.io");
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    //COMO OPTENER LA COOKIE
    const cookie = socket.handshake.headers.cookie;
    //LO QUE HACE ESTO ES OBTENERME LA VARIABLE DE 'USERNAME'
    const user = cookie.split("=").pop();

    socket.on("message", (message) => {
      io.emit("message", {
        user,
        message,
      });
    });
  });
};
