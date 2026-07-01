import type { Order, OrderStatus } from "../../../types/order";
import type { IUser } from "../../../types/IUser";

import {

    getOrders,

    saveOrders,

    getUsers,

    getUser

} from "../../../utils/localStorage";

import { initNavbar } from "../../../utils/navbar";

import { showToast } from "../../../utils/toast";

initNavbar();

/* =====================================================
   DATOS
===================================================== */

let orders: Order[] = [];

let users: IUser[] = [];

let editingOrder: Order | null = null;

/* =====================================================
   ELEMENTOS
===================================================== */

const container =
    document.getElementById(
        "ordersContainer"
    ) as HTMLElement;

const search =
    document.getElementById(
        "searchOrder"
    ) as HTMLInputElement;

const filterStatus =
    document.getElementById(
        "filterStatus"
    ) as HTMLSelectElement;

const welcomeUser =
    document.getElementById(
        "welcomeUser"
    ) as HTMLElement;

/* Modal */

const modal =
    document.getElementById(
        "statusModal"
    ) as HTMLElement;

const selectEstado =
    document.getElementById(
        "orderStatus"
    ) as HTMLSelectElement;

const btnGuardar =
    document.getElementById(
        "btnGuardar"
    ) as HTMLButtonElement;

const btnCancelar =
    document.getElementById(
        "btnCancelar"
    ) as HTMLButtonElement;

const btnClose =
    document.getElementById(
        "btnCloseModal"
    ) as HTMLButtonElement;

const detailModal =
    document.getElementById(
        "detailModal"
    ) as HTMLElement;

const btnCloseDetail =
    document.getElementById(
        "btnCloseDetail"
    ) as HTMLButtonElement;

/* =====================================================
   USUARIO
===================================================== */

const user = getUser();

if (

    user &&

    welcomeUser

){

    welcomeUser.textContent =

        `👋 ${user.nombre}`;

}

/* =====================================================
   CARGA
===================================================== */

function loadData(): void {

    orders = getOrders();

    users = getUsers();

    applyFilters();

}

/* =====================================================
   RENDER
===================================================== */

function render(list: Order[]): void {

    container.innerHTML = "";

    list.forEach(order => {

        const cliente =

            users.find(

                u =>

                    u.email ===

                    order.userEmail

            );
            

        const article =
            document.createElement(
                "article"
            );

        article.className =
            "order-card";

        article.innerHTML = `

<div class="order-left">

    <div class="order-header">

        <h3>

            Pedido #${order.id}

        </h3>

        <span class="status ${getStatusClass(order.estado)}">

            ${getStatusText(order.estado)}
            

        </span>

    </div>

    <p>

        <strong>

            Cliente:

        </strong>

        ${cliente?.nombre ?? order.userEmail}

    </p>

    <p>

        <strong>

            Email:

        </strong>

        ${order.userEmail}

    </p>

    <p>

        <strong>

            Fecha:

        </strong>

        ${new Date(order.fecha).toLocaleString()}

    </p>

</div>

<div class="order-right">

    <div class="order-info">

        <div class="order-item">

            🛒

            <strong>

                ${order.items.length}

            </strong>

        </div>

        <div class="order-item">

            💲

            <strong>

                $${order.total.toLocaleString()}

            </strong>

        </div>

    </div>

    <div class="order-actions">

        <button

            class="btn-secondary detail">

            Ver detalle

        </button>

        <button

            class="btn-primary change-state">

            Cambiar estado

        </button>

    </div>

</div>

        `;
        const btn = article.querySelector(".change-state") as HTMLButtonElement;

        const btnDetalle = article.querySelector( ".detail") as HTMLButtonElement;

        btnDetalle.addEventListener("click",() => openDetail(order));

        btn.addEventListener( "click", () => openModal(order));

        container.appendChild( article );

    });

}

/* =====================================================
   BADGES
===================================================== */

function getStatusClass(
    estado: string
): string {

    switch (estado.toUpperCase()) {

        case "PENDIENTE":
        case "PENDING":

            return "warning";

        case "CONFIRMADO":
        case "CONFIRMED":

            return "info";

        case "TERMINADO":
        case "COMPLETED":

            return "active";

        case "CANCELADO":
        case "CANCELLED":
        case "CANCELED":

            return "deleted";

        default:

            return "warning";

    }

}

function getStatusText(
    estado:string
):string{

    switch(estado.toUpperCase()){

        case "PENDING":
        case "PENDIENTE":

            return "Pendiente";

        case "CONFIRMED":
        case "CONFIRMADO":

            return "Confirmado";

        case "COMPLETED":
        case "TERMINADO":

            return "Terminado";

        case "CANCELLED":
        case "CANCELED":
        case "CANCELADO":

            return "Cancelado";

        default:

            return estado;

    }

}

function openDetail(order: Order): void {

    const modal =
        document.getElementById("detailModal") as HTMLElement;

    const body =
        document.getElementById("detailBody") as HTMLElement;

    const cliente = users.find(

        u => u.email === order.userEmail

    );

    body.innerHTML = `

    <div class="invoice">

        <div class="invoice-top">

            <div>

                <h2>

                    Pedido #${order.id}

                </h2>

                <span class="invoice-status ${getStatusClass(order.estado)}">

                    ${getStatusText(order.estado)}

                </span>

            </div>

            <div class="invoice-date">

                ${new Date(order.fecha).toLocaleString()}

            </div>

        </div>

        <div class="invoice-client">

            <h3>

                Cliente

            </h3>

            <p>

                <strong>

                    ${cliente?.nombre ?? "Cliente"}

                </strong>

            </p>

            <p>

                ${order.userEmail}

            </p>

        </div>

        <div class="invoice-products">

            <div class="invoice-head">

                <span>

                    Producto

                </span>

                <span>

                    Cant.

                </span>

                <span>

                    Precio

                </span>

                <span>

                    Subtotal

                </span>

            </div>

            ${

                order.items.map(item => `

                <div class="invoice-row">

                    <span>

                        ${item.nombre}

                    </span>

                    <span>

                        ${item.cantidad}

                    </span>

                    <span>

                        $${item.precio.toLocaleString()}

                    </span>

                    <strong>

                        $${(item.cantidad * item.precio).toLocaleString()}

                    </strong>

                </div>

                `).join("")

            }

        </div>

        <div class="invoice-footer">

            <div>

                Productos

                <strong>

                    ${order.items.length}

                </strong>

            </div>

            <div class="invoice-total">

                TOTAL

                <span>

                    $${order.total.toLocaleString()}

                </span>

            </div>

        </div>

    </div>

    `;

    modal.classList.add("show");

}
/* =====================================================
   MODAL
===================================================== */

function openModal(order: Order): void {

    editingOrder = order;

    selectEstado.value =
        order.estado;

    modal.classList.add("show");

}

function closeModal(): void {

    editingOrder = null;

    modal.classList.remove("show");

}

btnCloseDetail.addEventListener(

    "click",

    () => {

        detailModal.classList.remove("show");

    }

);

detailModal.addEventListener(

    "click",

    e => {

        if (e.target === detailModal) {

            detailModal.classList.remove("show");

        }

    }

);


/* =====================================================
   BOTONES
===================================================== */

btnCancelar.addEventListener(

    "click",

    closeModal

);

btnClose.addEventListener(

    "click",

    closeModal

);

modal.addEventListener(

    "click",

    e => {

        if (e.target === modal)

            closeModal();

    }

);

document.addEventListener(

    "keydown",

    e => {

        if (e.key === "Escape")

            closeModal();

    }

);

/* =====================================================
   CAMBIAR ESTADO
===================================================== */

btnGuardar.addEventListener(

    "click",

    () => {

        if (!editingOrder)

            return;

        editingOrder.estado =

            selectEstado.value as OrderStatus;

        saveOrders(

            orders

        );

        showToast(

            "Estado actualizado correctamente.",

            "success"

        );

        applyFilters();

        closeModal();

    }

);

/* =====================================================
   FILTROS
===================================================== */

function applyFilters(): void {

    let list = [...orders];

    /* ===========================
       BUSCADOR
    =========================== */

    const texto =

        search.value
            .toLowerCase()
            .trim();

    if (texto !== "") {

        list = list.filter(order => {

            const cliente =

                users.find(

                    u =>

                        u.email ===

                        order.userEmail

                );

            const nombre =

                cliente?.nombre

                    ?.toLowerCase()

                ?? "";

            return (

                nombre.includes(texto)

                ||

                order.userEmail

                    .toLowerCase()

                    .includes(texto)

            );

        });

    }

    /* ===========================
       ESTADO
    =========================== */

    if (

        filterStatus.value !== "all"

    ) {

        list = list.filter(

            order =>

                order.estado ===

                filterStatus.value

        );

    }

    /* ===========================
       MÁS RECIENTES PRIMERO
    =========================== */

    list.sort(

        (a, b) =>

            new Date(b.fecha).getTime()

            -

            new Date(a.fecha).getTime()

    );

    render(list);

}

/* =====================================================
   EVENTOS
===================================================== */

search.addEventListener(

    "input",

    applyFilters

);

filterStatus.addEventListener(

    "change",

    applyFilters

);

/* =====================================================
   INICIO
===================================================== */

loadData();