import { initNavbar } from "../../../utils/navbar";
import { bootstrap } from "../../../utils/bootstrap";

import {
    getProducts,
    getCategories
} from "../../../utils/localStorage";

import type { Product, CartItem } from "../../../types/product";
import type { ICategory } from "../../../types/categoria";

await bootstrap();

const PRODUCTS = getProducts();
const CATEGORIES = getCategories();

let currentProducts = PRODUCTS.filter(

    product =>

        !product.eliminado &&

        product.categorias.every(

            categoria => !categoria.eliminado

        )

);

let currentSort = "default";

initNavbar();

const categoryList =
    document.getElementById("category-list") as HTMLElement;

const productContainer =
    document.getElementById("product-container") as HTMLElement;

const searchInput =
    document.getElementById("search") as HTMLInputElement;

const sortButton =
    document.getElementById("sortButton") as HTMLButtonElement;

const sortDropdown =
    document.getElementById("sortDropdown") as HTMLElement;

const sidebar =
    document.getElementById("sidebar") as HTMLElement;

const toggleSidebar =
    document.getElementById("toggleSidebar") as HTMLButtonElement;

/* =====================================================
   ICONOS
===================================================== */

const icons: Record<string, string> = {

    "Todos": "🍽",

    "Hamburguesas": "🍔",

    "Pizzas": "🍕",

    "Empanadas": "🥟",

    "Bebidas": "🥤",

    "Papas Fritas": "🍟"

};

/* =====================================================
   CATEGORÍAS
===================================================== */

const allItem = document.createElement("li");

allItem.innerHTML = `${icons["Todos"]} Todos`;

allItem.classList.add("active");

allItem.addEventListener("click", () => {

    document
        .querySelectorAll("#category-list li")
        .forEach(li => li.classList.remove("active"));

    allItem.classList.add("active");

    currentProducts = PRODUCTS.filter(

        p =>

            !p.eliminado &&

            p.categorias.every(

                c => !c.eliminado

            )

    );

    aplicarFiltros();

});

categoryList.appendChild(allItem);

CATEGORIES

    .filter(cat => !cat.eliminado)

    .forEach((cat: ICategory) => {

        const li = document.createElement("li");

        li.innerHTML = `${icons[cat.nombre] ?? "🍽"} ${cat.nombre}`;

        li.addEventListener("click", () => {

            document
                .querySelectorAll("#category-list li")
                .forEach(li => li.classList.remove("active"));

            li.classList.add("active");

            currentProducts = PRODUCTS.filter(

                product =>

                    !product.eliminado &&

                    product.categorias.some(

                        categoria =>

                            categoria.id === cat.id &&

                            !categoria.eliminado

                    )

            );

            aplicarFiltros();

        });

        categoryList.appendChild(li);

    });

/* =====================================================
   SIDEBAR
===================================================== */

toggleSidebar.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});

/* =====================================================
   DROPDOWN
===================================================== */

sortButton.addEventListener("click", () => {

    sortDropdown.classList.toggle("open");

});

document.addEventListener("click", (e) => {

    if (

        !sortButton.contains(e.target as Node) &&

        !sortDropdown.contains(e.target as Node)

    ) {

        sortDropdown.classList.remove("open");

    }

});

sortDropdown.querySelectorAll("div").forEach(option => {

    option.addEventListener("click", () => {

        currentSort = option.getAttribute("data-sort") ?? "default";

        sortDropdown.classList.remove("open");

        aplicarFiltros();

    });

});

/* =====================================================
   RENDER PRODUCTOS
===================================================== */ 

function renderProducts(products: Product[]) {

    productContainer.innerHTML = "";

    products = products.filter(

        product =>

            !product.eliminado &&

            product.categorias.every(

                categoria => !categoria.eliminado

            )

    );

    const cart: CartItem[] = JSON.parse(

        localStorage.getItem("cart") || "[]"

    );

    if (products.length === 0) {

        productContainer.innerHTML = `

            <div class="no-results">

                <p>No se encontraron productos.</p>

            </div>

        `;

        return;

    }

    products.forEach(product => {

        const existing = cart.find(

            c => c.id === product.id

        );

        const cantidad = existing?.cantidad ?? 0;

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

            <img
                src="${product.imagen}"
                alt="${product.nombre}">

            <h3>

                ${product.nombre}

            </h3>

            <span class="badge">

                🏷 ${product.categorias[0].nombre}

            </span>

            <p>

                ${product.descripcion}

            </p>

            <div class="price">

                $${product.precio.toLocaleString("es-AR")}

            </div>

            <div class="cantidad-control">

                <button
                    class="menos"

                    ${cantidad === 0 ? "disabled" : ""}>

                    −

                </button>

                <input
                    class="cantidad"
                    readonly
                    value="${cantidad}">

                <button
                    class="mas"

                    ${!product.disponible ? "disabled" : ""}>

                    +

                </button>

            </div>

        `;

        const btnMas =
            card.querySelector(".mas") as HTMLButtonElement;

        const btnMenos =
            card.querySelector(".menos") as HTMLButtonElement;

        const input =
            card.querySelector(".cantidad") as HTMLInputElement;

        btnMas.addEventListener("click", () => {

            addToCart(product);

            input.value =

                String(Number(input.value) + 1);

            btnMenos.disabled = false;

        });

        btnMenos.addEventListener("click", () => {

            removeFromCart(product);

            const cant = Number(input.value) - 1;

            input.value = String(cant);

            btnMenos.disabled = cant <= 0;

        });

        productContainer.appendChild(card);

    });

}

/* =====================================================
   FILTROS
===================================================== */

function aplicarFiltros() {

    let lista = [...currentProducts];

    const texto =

        searchInput.value

            .toLowerCase()

            .trim();

    if (texto) {

        lista = lista.filter(

            p =>

                p.nombre

                    .toLowerCase()

                    .includes(texto)

        );

    }

    switch (currentSort) {

        case "az":

            lista.sort(

                (a, b) =>

                    a.nombre.localeCompare(b.nombre)

            );

            break;

        case "za":

            lista.sort(

                (a, b) =>

                    b.nombre.localeCompare(a.nombre)

            );

            break;

        case "precioAsc":

            lista.sort(

                (a, b) =>

                    a.precio - b.precio

            );

            break;

        case "precioDesc":

            lista.sort(

                (a, b) =>

                    b.precio - a.precio

            );

            break;

    }

    renderProducts(lista);

}

searchInput.addEventListener(

    "input",

    aplicarFiltros

);

/* =====================================================
   CARRITO
===================================================== */

function addToCart(product: Product) {

    const cart: CartItem[] = JSON.parse(

        localStorage.getItem("cart") || "[]"

    );

    const existing =

        cart.find(

            c => c.id === product.id

        );

    if (existing)

        existing.cantidad++;

    else

        cart.push({

            id: product.id,

            nombre: product.nombre,

            precio: product.precio,

            cantidad: 1

        });

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

}

function removeFromCart(product: Product) {

    let cart: CartItem[] = JSON.parse(

        localStorage.getItem("cart") || "[]"

    );

    const existing =

        cart.find(

            c => c.id === product.id

        );

    if (!existing)

        return;

    existing.cantidad--;

    if (existing.cantidad <= 0) {

        cart = cart.filter(

            c => c.id !== product.id

        );

    }

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

}

/* =====================================================
   INICIO
===================================================== */

aplicarFiltros();