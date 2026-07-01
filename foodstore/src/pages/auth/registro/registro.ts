import type { IUser } from "../../../types/IUser";
import { getUsers, saveUsers, saveUser } from "../../../utils/localStorage";

const formRegistro = document.getElementById("formRegistro") as HTMLFormElement;
const messageBox = document.getElementById("registro-message") as HTMLElement;

formRegistro.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = (document.getElementById("idNombre") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  const users: IUser[] = getUsers();

  // Validar duplicados por email
  const exists = users.some(u => u.email === email);
  if (exists) {
    messageBox.style.color = "red";
    messageBox.innerHTML = "Ese email ya está registrado.";
    return;
  }

  // Crear nuevo usuario con rol por defecto "client"
  const newUser: IUser = {
    nombre,
    email,
    password,
    loggedIn: true, // 👈 ya queda logueado
    role: "client"
  };

  // Guardar en la lista de usuarios
  users.push(newUser);
  saveUsers(users);

  // Guardar usuario activo en sesión
  saveUser(newUser);

  messageBox.style.color = "green";
  messageBox.innerHTML = "Usuario registrado con éxito. Redirigiendo...";

  formRegistro.reset();

  // Redirigir directamente al index
  setTimeout(() => {
    window.location.href = "/";
  }, 2000);
});
