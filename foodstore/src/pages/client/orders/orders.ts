import type { Order } from "../../../types/order";

import {
    getOrders,
    getUser
} from "../../../utils/localStorage";

import { initNavbar } from "../../../utils/navbar";

initNavbar();

const container =
    document.getElementById("orders-container") as HTMLElement;

/* =====================================================
   BADGE ESTADO
===================================================== */

function getStatusClass(estado: string): string {

    switch (estado) {

        case "PENDIENTE":
            return "pendiente";

        case "CONFIRMADO":
            return "confirmado";

        case "TERMINADO":
            return "terminado";

        case "CANCELADO":
            return "cancelado";

        default:
            return "";

    }

}

/* =====================================================
   RENDER
===================================================== */

function renderOrders() {

    const user = getUser();

    if (!user) {

        container.innerHTML = `

            <div class="empty-orders">

                <span class="material-symbols-outlined">

                    lock

                </span>

                <h3>

                    Debe iniciar sesión

                </h3>

                <p>

                    Inicie sesión para consultar sus pedidos.

                </p>

                <a href="../../auth/login/login.html">

                    Iniciar sesión

                </a>

            </div>

        `;

        return;

    }

    const orders = getOrders();

    const userOrders = orders.filter(

        order =>

            order.userEmail === user.email

    );

    if (userOrders.length === 0) {

        container.innerHTML = `

            <div class="empty-orders">

                <span class="material-symbols-outlined">

                    shopping_bag

                </span>

                <h3>

                    Todavía no realizaste pedidos

                </h3>

                <p>

                    Explorá nuestro catálogo y realizá tu primera compra.

                </p>

                <a href="../../store/home/home.html">

                    Ir al catálogo

                </a>

            </div>

        `;

        return;

    }

    container.innerHTML = "";

    userOrders

        .sort(

            (a, b) => b.id - a.id

        )

        .forEach((order: Order) => {

            const card = document.createElement("article");

            card.className = "order-card";

            card.innerHTML = `

                <div class="order-header">

                    <h3>

                        Pedido #${order.id}

                    </h3>

                    <span class="status ${getStatusClass(order.estado)}">

                        ${order.estado}

                    </span>

                </div>

                <div class="order-info">

                    <div class="info-box">

                        <small>

                            Fecha

                        </small>

                        <strong>

                            ${new Date(order.fecha).toLocaleDateString("es-AR")}

                        </strong>

                    </div>

                    <div class="info-box">

                        <small>

                            Productos

                        </small>

                        <strong>

                            ${order.items.length}

                        </strong>

                    </div>

                    <div class="info-box">

                        <small>

                            Total

                        </small>

                        <strong>

                            $${order.total.toLocaleString("es-AR")}

                        </strong>

                    </div>

                </div>

                <h4 class="products-title">

                    Productos del pedido

                </h4>

                <div class="product-list">

                    ${order.items.map(item => `

                        <div class="product-item">

                            <span>

                                ${item.nombre}

                                x${item.cantidad}

                            </span>

                            <span>

                                $${(item.precio * item.cantidad).toLocaleString("es-AR")}

                            </span>

                        </div>

                    `).join("")}

                </div>

            `;

            container.appendChild(card);

        });

}

/* =====================================================
   INICIO
===================================================== */

renderOrders();