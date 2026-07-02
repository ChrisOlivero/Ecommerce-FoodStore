import {
    getUser,
    removeUser
} from "./localStorage";

export function initNavbar() {

    const user = getUser();

    const navLogin =
        document.getElementById("nav-login");

    const navCarrito =
        document.getElementById("nav-carrito");

    const navPedidos =
        document.getElementById("nav-pedidos");

    const navAdmin =
        document.getElementById("nav-admin");

    const navTitle =
        document.querySelector(".nav__tittle") as HTMLAnchorElement | null;

    /* ======================================
       TÍTULO
    ====================================== */

    if (navTitle) {

        navTitle.href =
            "/src/pages/store/home/home.html";

    }

    /* ======================================
       LOGIN
    ====================================== */

    if (navLogin) {

        const link =
            navLogin.querySelector("a");

        if (!user) {

            if (link) {

                link.innerHTML = `

                    <span class="material-symbols-outlined">

                        login

                    </span>

                    Iniciar sesión

                `;

                link.href =
                    "../../auth/login/login.html";

            }

        } else {

            if (link) {

                link.innerHTML = `

                    <span class="material-symbols-outlined">

                        logout

                    </span>

                    Cerrar sesión

                `;

                link.addEventListener("click", (e) => {

                    e.preventDefault();

                    removeUser();

                    window.location.href =
                        "/";

                });

            }

        }

    }

    /* ======================================
       SIN SESIÓN
    ====================================== */

    if (!user) {

        if (navCarrito)
            navCarrito.style.display = "none";

        if (navPedidos)
            navPedidos.style.display = "none";

        if (navAdmin)
            navAdmin.style.display = "none";

        return;

    }

    /* ======================================
       CLIENTE
    ====================================== */

    if (user.role === "client") {

        if (navCarrito)
            navCarrito.style.display = "block";

        if (navPedidos)
            navPedidos.style.display = "block";

        if (navAdmin)
            navAdmin.style.display = "none";

    }

    /* ======================================
       ADMIN
    ====================================== */

    if (user.role === "admin") {

        if (navAdmin)
            navAdmin.style.display = "block";

        if (navCarrito)
            navCarrito.style.display = "none";

        if (navPedidos)
            navPedidos.style.display = "none";

    }

}