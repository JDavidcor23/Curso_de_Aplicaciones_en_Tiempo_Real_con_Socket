const socket = io({
  auth: {
    token: "mal",
  },
});

// EN CASO DE ERROR EN EL MIDDLEWARE
socket.on("connect_error", (err) => {
  console.log("Error de conexión 😵‍💫");
  console.log(err.message);
  console.log(err.data.details);
});
