import type { CartItem } from "../../../types/product";
import type { Order } from "../../../types/order";

import { initNavbar } from "../../../utils/navbar";

import {

    getUser,

    getOrders,

    saveOrders

} from "../../../utils/localStorage";

initNavbar();

/* =====================================================
   ELEMENTOS
===================================================== */

const cartContainer =
    document.getElementById("cart-container") as HTMLElement;

const subtotalContainer =
    document.getElementById("cart-subtotal") as HTMLElement;

const totalContainer =
    document.getElementById("cart-total") as HTMLElement;

const checkoutBtn =
    document.getElementById("checkout-btn") as HTMLButtonElement;

const clearBtn =
    document.getElementById("clear-cart-btn") as HTMLButtonElement;

/* =====================================================
   STORAGE
===================================================== */

function getCart(): CartItem[] {

    return JSON.parse(

        localStorage.getItem("cart") || "[]"

    );

}

function saveCart(cart: CartItem[]) {

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

}

/* =====================================================
   BOTONES
===================================================== */

function updateButtons(cart: CartItem[]) {

    const empty = cart.length === 0;

    checkoutBtn.disabled = empty;

    clearBtn.disabled = empty;

}
function renderCart() {

    const cart = getCart();

    cartContainer.innerHTML = "";

    updateButtons(cart);

    if (cart.length === 0) {

        subtotalContainer.textContent = "";

        totalContainer.textContent = "";

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <span class="material-symbols-outlined">

                    shopping_cart_off

                </span>

                <h3>

                    Tu carrito está vacío

                </h3>

                <p>

                    Agregá productos para realizar un pedido.

                </p>

                <a href="../home/home.html">

                    Ir al catálogo

                </a>

            </div>

        `;

        return;

    }

    cart.forEach(item => {

        const row = document.createElement("article");

        row.className = "cart-item";

        row.innerHTML = `

            <h4>

                ${item.nombre}

            </h4>

            <p>

                Precio unitario

            </p>

            <div class="price">

                $${item.precio.toLocaleString("es-AR")}

            </div>

            <div class="cantidad-control">

                <button class="menos">

                    −

                </button>

                <input

                    class="cantidad"

                    readonly

                    value="${item.cantidad}">

                <button class="mas">

                    +

                </button>

            </div>

            <p>

                Subtotal

            </p>

            <div class="price">

                $${(item.precio * item.cantidad).toLocaleString("es-AR")}

            </div>

        `;

        const btnMas =
            row.querySelector(".mas") as HTMLButtonElement;

        const btnMenos =
            row.querySelector(".menos") as HTMLButtonElement;

        btnMas.addEventListener("click", () => {

            item.cantidad++;

            saveCart(cart);

            renderCart();

        });

        btnMenos.addEventListener("click", () => {

            item.cantidad--;

            const nuevo = cart.filter(

                p => p.cantidad > 0

            );

            saveCart(nuevo);

            renderCart();

        });

        cartContainer.appendChild(row);

    });

    const subtotal = cart.reduce(

        (sum, item) =>

            sum + item.precio * item.cantidad,

        0

    );

    subtotalContainer.textContent =

        `Subtotal: $${subtotal.toLocaleString("es-AR")}`;

    totalContainer.textContent =

        `$${subtotal.toLocaleString("es-AR")}`;

}

/* =====================================================
   EVENTOS
===================================================== */

clearBtn.addEventListener("click", () => {

    if (!confirm("¿Vaciar el carrito?"))

        return;

    localStorage.removeItem("cart");

    renderCart();

});

checkoutBtn.addEventListener("click", () => {

    const user = getUser();

    if (!user) {

        alert("Debes iniciar sesión.");

        return;

    }

    const cart = getCart();

    if (cart.length === 0)

        return;

    const total = cart.reduce(

        (sum, item) =>

            sum + item.precio * item.cantidad,

        0

    );

    const orders = getOrders();

    const order: Order = {

        id: Date.now(),

        userEmail: user.email,

        fecha: new Date().toISOString(),

        estado: "PENDIENTE",

        items: [...cart],

        total

    };

    orders.push(order);

    saveOrders(orders);

    localStorage.removeItem("cart");

    alert("✅ Pedido generado correctamente.");

    renderCart();

});

/* =====================================================
   INICIO
===================================================== */

renderCart();