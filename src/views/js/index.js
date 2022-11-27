const socket = io();

const circle = document.querySelector("#circle");

//FUNCION QUE MUEVE EL CIRCULO
const drawCircle = (position) => {
  circle.style.top = position.top;
  circle.style.left = position.left;
};

//FUNCION QUE OBTIENE LA POSICIÓN DEL MOUSE,
// EJECUTA LA FUNCION DE MOVER EL CIRCULO Y LO ENVIA AL SOCKET
const drag = (e) => {
  const position = {
    top: e.clientY + "px",
    left: e.clientX + "px",
  };

  drawCircle(position);
  socket.emit("circle position", position);
};

//'MOUSEDOWN' CUANDO DEJO PRESIONADO EL CLICK
document.addEventListener("mousedown", (e) => {
  //'MOUSEMOVE CUANDO SE MUEVE EL MOUSE'
  document.addEventListener("mousemove", drag);
});

//CUANDO DEJO DE PRESIONAR EL CLICK
document.addEventListener("mouseup", (e) => {
  //REMUEVO LA FUNCIÓN
  document.removeEventListener("mousemove", drag);
});
//ESTA SOLO SE VA A ENVIAR A OTROS USUARIOS
socket.on("move circle", (position) => {
  drawCircle(position);
});
