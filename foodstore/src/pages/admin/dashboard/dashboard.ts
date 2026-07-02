import { initNavbar } from "../../../utils/navbar";

import {
    getCategories,
    getOrders,
    getProducts,
    getUser
} from "../../../utils/localStorage";


initNavbar();

/* =====================================================
   DATOS
===================================================== */

const user = getUser();

const categorias = getCategories();

const productos = getProducts();

const pedidos = getOrders();

/* =====================================================
   ELEMENTOS
===================================================== */

const welcomeUser =
    document.getElementById("welcomeUser") as HTMLElement;

const totalCategorias =
    document.getElementById("totalCategorias") as HTMLElement;

const totalProductos =
    document.getElementById("totalProductos") as HTMLElement;

const totalPedidos =
    document.getElementById("totalPedidos") as HTMLElement;

const productosDisponibles =
    document.getElementById("productosDisponibles") as HTMLElement;

const resCategorias =
    document.getElementById("resCategorias") as HTMLElement;

const resProductosActivos =
    document.getElementById("resProductosActivos") as HTMLElement;

const resProductosInactivos =
    document.getElementById("resProductosInactivos") as HTMLElement;

const pedPendientes =
    document.getElementById("pedPendientes") as HTMLElement;

const pedConfirmados =
    document.getElementById("pedConfirmados") as HTMLElement;

const pedTerminados =
    document.getElementById("pedTerminados") as HTMLElement;

const pedCancelados =
    document.getElementById("pedCancelados") as HTMLElement;


/* =====================================================
   RENDER BIENVENIDA
===================================================== */

function renderWelcome(): void {

    if (!user) return;

    welcomeUser.textContent =
        `👋 ${user.nombre}`;

}

/* =====================================================
   TARJETAS
===================================================== */

function renderCards(): void {

    totalCategorias.textContent =
    String(

        categorias.filter(

            c => !c.eliminado

        ).length

    );

totalProductos.textContent =
    String(

        productos.filter(

            p => !p.eliminado

        ).length

    );

totalPedidos.textContent =
    String(pedidos.length);

productosDisponibles.textContent =
    String(

        productos.filter(

            p =>

                !p.eliminado &&

                p.disponible

        ).length

    );

}

/* =====================================================
   RESUMEN
===================================================== */

function renderSummary(): void {

    resCategorias.textContent =
        String(

            categorias.filter(

                c => !c.eliminado

            ).length

        );

    const productosActivos =

        productos.filter(

            p =>

                !p.eliminado &&

                p.disponible

        );

    const productosInactivos =

        productos.filter(

            p =>

                p.eliminado ||

                !p.disponible

        );

    resProductosActivos.textContent =
        String(productosActivos.length);

    resProductosInactivos.textContent =
        String(productosInactivos.length);

}

/* =====================================================
   PEDIDOS
===================================================== */

function renderOrders(): void {

    pedPendientes.textContent =
        String(

            pedidos.filter(

                p => p.estado === "PENDIENTE"

            ).length

        );

    pedConfirmados.textContent =
        String(

            pedidos.filter(

                p => p.estado === "CONFIRMADO"

            ).length

        );

    pedTerminados.textContent =
        String(

            pedidos.filter(

                p => p.estado === "TERMINADO"

            ).length

        );

    pedCancelados.textContent =
        String(

            pedidos.filter(

                p => p.estado === "CANCELADO"

            ).length

        );

}



/* =====================================================
   INICIO
===================================================== */

function init(): void {

    renderWelcome();

    renderCards();

    renderSummary();

    renderOrders();

    

}

init();