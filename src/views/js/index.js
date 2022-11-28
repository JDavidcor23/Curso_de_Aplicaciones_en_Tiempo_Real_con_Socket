//CUANDO HACEMOS ESTO EL SOCKET SE CONECTA DE MANERA AUTOMATICA 'DEFAULT'
// const socket = io();

//QUE GRUPO PERTENECEMOS
const user = prompt("Escribe tu usuario");

//LISTA DE PROFES
const profes = ["RetaxMaster", "juandc", "GNDX"];

//VARIABLES
let socketNamespace, group;

const chat = document.querySelector("#chat");
const namespace = document.querySelector("#namespace");

//SI EL USER ESTA INCLUIDO EN LA LISTA DE PROFES
if (profes.includes(user)) {
  //NOS CONECTAMOS AL NAMESPACE DE TEACHERS
  socketNamespace = io("/teachers");
  group = "teachers";
} else {
  //SI NO AL DE ESTUDIANTES
  socketNamespace = io("/students");
  group = "students";
}

//CUANDO YA DECLAREMOS EL SOCKET NOS CONECTAMOS Y ESCUCHAMOS
socketNamespace.on("connect", () => {
  //ESCRIBIMOS EN EL HTML
  namespace.textContent = group;
});

//ENVIAR MENSAJE
const sendMessage = document.querySelector("#sendMessage");
sendMessage.addEventListener("click", () => {
  const message = prompt("Escribe tu mensaje: ");

  socketNamespace.emit("send message", {
    message,
    user,
  });
});

//RECIBIR EL MENSAJE
socketNamespace.on("message", (messageData) => {
  const { user, message } = messageData;

  const li = document.createElement("li");
  li.textContent = `${user} : ${message}`;
  chat.append(li);
});
