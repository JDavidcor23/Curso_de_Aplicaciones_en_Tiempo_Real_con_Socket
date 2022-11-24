const socket = io();

//CONECCIÓN DEL LADO DEL CLIENTE

//REVISA SI ESTA O NO CONECTADO
function checkSocketStatus() {
  console.log("Estado del socket", socket.connected);
}

//CONECCIÓN
socket.on("connect", () => {
  console.log("se ha conectado");
  checkSocketStatus();
});

//CUANDO NO LOGRA RECONECTARSE
socket.on("connect_error", () => {
  console.log("No pude conectarme");
});

//DESCDONECTADO
socket.on("disconnect", () => {
  console.log("El socket se ha descdonectado");
  checkSocketStatus();
});

//ESCUCHA CADA VEZ QUE QUIRE VOVEL A CONECTARSE
socket.io.on("reconnect_attempt", () => {
  console.log("intentando reconectarme");
});

//CUANDO SE RECONECTA
socket.io.on("reconnect", () => {
  console.log("me he vuelto a conectar");
});
