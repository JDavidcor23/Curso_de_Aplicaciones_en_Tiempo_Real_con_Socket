const login = document.querySelector("#login");

//OBTIENE EL USER
login.addEventListener("click", () => {
  const user = document.querySelector("#username").value;

  if (user != "") {
    document.cookie = `username=${user}`;
    document.location.href = "/";
  } else {
    alert("¡Escribe un nombre de usuario!");
  }
});
