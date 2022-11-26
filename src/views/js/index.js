const socket = io();

socket.on("welcome", (data) => {
  const text = document.querySelector("#text");
  text.textContent = data;
});

const emitToServer = document.querySelector("#emit-to-server");
emitToServer.addEventListener("click", () => {
  socket.emit("server", "Hola, servidor 👀");
});

socket.on("everyone", (message) => {
  console.log(message);
});
//VARIABLE
const emitToLast = document.querySelector("#emit-to-last");

//MENSAJE QUE SE LE VA A ENVIAR AL BACK
emitToLast.addEventListener("click", () => {
  socket.emit("last", "Hola 😄");
});

//MENSAJE QUE VA A RECIBIR EL ULTIMO SOCKET CONECTADO
socket.on("salute", (message) => {
  console.log(message);
});
