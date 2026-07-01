import type { IUser } from "../../../types/IUser";
import { UserService } from "../../../services/user.service";
import { saveUser } from "../../../utils/localStorage";

const formLogin = document.getElementById("formLogin") as HTMLFormElement;
const messageBox = document.getElementById("login-message") as HTMLElement;

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = (
    document.getElementById("email") as HTMLInputElement
  ).value.trim();

  const password = (
    document.getElementById("password") as HTMLInputElement
  ).value.trim();

  try {
    // Obtener usuarios desde el JSON
    const users: IUser[] = await UserService.getAll();

    // Buscar coincidencia
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      user.loggedIn = true;

      // Guardar solamente la sesión
      saveUser(user);

      window.location.href = "/";
    } else {
      messageBox.innerHTML = `
        <p>
          Usuario o contraseña incorrectos.
        </p>
      `;
    }
  } catch (error) {
    console.error(error);

    messageBox.innerHTML = `
      <p>Error al cargar los usuarios.</p>
    `;
  }
});
