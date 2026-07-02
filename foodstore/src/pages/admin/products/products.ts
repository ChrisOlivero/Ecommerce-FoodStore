import type { Product } from "../../../types/product";
import type { ICategory } from "../../../types/categoria";

import {
    getProducts,
    saveProducts,
    getCategories,
    getUser
} from "../../../utils/localStorage";

import { initNavbar } from "../../../utils/navbar";

import { showToast } from "../../../utils/toast";

initNavbar();

/* =====================================================
   DATOS
===================================================== */

let products: Product[] = [];

let categories: ICategory[] = [];

let editingId: number | null = null;

/* =====================================================
   ELEMENTOS
===================================================== */

const tbody =
    document.getElementById("productsTable") as HTMLElement;

const search =
    document.getElementById("searchProduct") as HTMLInputElement;

const filterCategory =
    document.getElementById("filterCategory") as HTMLSelectElement;

const filterState =
    document.getElementById("filterState") as HTMLSelectElement;

const welcomeUser =
    document.getElementById("welcomeUser") as HTMLElement;

/* Modal */

const modal =
    document.getElementById("productModal") as HTMLElement;

const modalTitle =
    document.getElementById("modalTitle") as HTMLElement;

const btnNuevo =
    document.getElementById("btnNuevoProducto") as HTMLButtonElement;

const btnGuardar =
    document.getElementById("btnGuardar") as HTMLButtonElement;

const btnCancelar =
    document.getElementById("btnCancelar") as HTMLButtonElement;

const btnClose =
    document.getElementById("btnCloseModal") as HTMLButtonElement;

/* Formulario */

const inputNombre =
    document.getElementById("productName") as HTMLInputElement;

const inputDescripcion =
    document.getElementById("productDescription") as HTMLTextAreaElement;

const inputPrecio =
    document.getElementById("productPrice") as HTMLInputElement;

const inputStock =
    document.getElementById("productStock") as HTMLInputElement;

const inputImagen =
    document.getElementById("productImage") as HTMLInputElement;

const inputDisponible =
    document.getElementById("productAvailable") as HTMLInputElement;

const selectCategoria =
    document.getElementById("productCategory") as HTMLSelectElement;

/* =====================================================
   USUARIO
===================================================== */

const user = getUser();

if (user && welcomeUser) {

    welcomeUser.textContent =
        `👋 ${user.nombre}`;

}

/* =====================================================
   CARGA
===================================================== */

function loadData(): void {

    products = getProducts();

    categories = getCategories();

    loadCategorySelect();

    applyFilters();

}

/* =====================================================
   SELECT CATEGORIAS
===================================================== */

function loadCategorySelect(): void {

    selectCategoria.innerHTML = "";

    filterCategory.innerHTML = `

        <option value="all">

            Todas las categorías

        </option>

    `;

    categories

        .filter(c => !c.eliminado)

        .forEach(category => {

            selectCategoria.innerHTML += `

                <option value="${category.id}">

                    ${category.nombre}

                </option>

            `;

            filterCategory.innerHTML += `

                <option value="${category.id}">

                    ${category.nombre}

                </option>

            `;

        });

}

/* =====================================================
   TABLA
===================================================== */

function render(list: Product[]): void {

    tbody.innerHTML = "";

    list.forEach(product => {

        const tr =
            document.createElement("tr");

        tr.innerHTML = `

            <td>

                ${product.id}

            </td>

            <td>

                <img
                    class="product-image"
                    src="${product.imagen}"
                    alt="${product.nombre}">

            </td>

            <td>

                ${product.nombre}

            </td>

            <td>

                ${product.descripcion}

            </td>

            <td>

                $${product.precio.toLocaleString()}

            </td>

            <td>

                ${product.categorias
                    .map(c => c.nombre)
                    .join(", ")}

            </td>

            <td>

                ${product.stock}

            </td>

            <td>

                <span class="status ${
                    product.eliminado
                        ? "deleted"
                        : product.disponible
                            ? "active"
                            : "warning"
                }">

                    ${
                        product.eliminado
                            ? "Eliminado"
                            : product.disponible
                                ? "Disponible"
                                : "No disponible"
                    }

                </span>

            </td>

            <td>

                <div class="actions">

                    ${
                        !product.eliminado

                        ?

                        `

                        <button class="icon-btn edit">

                            <span class="material-symbols-outlined">

                                edit

                            </span>

                        </button>

                        <button class="icon-btn delete">

                            <span class="material-symbols-outlined">

                                delete

                            </span>

                        </button>

                        `

                        :

                        `

                        <button class="icon-btn restore">

                            <span class="material-symbols-outlined">

                                restore

                            </span>

                        </button>

                        `

                    }

                </div>

            </td>

        `;

        const btnEdit =
            tr.querySelector(".edit");

        btnEdit?.addEventListener(

            "click",

            () => openEdit(product)

        );

        const btnDelete =
            tr.querySelector(".delete");

        btnDelete?.addEventListener(

            "click",

            () => remove(product.id)

        );

        const btnRestore =
            tr.querySelector(".restore");

        btnRestore?.addEventListener(

            "click",

            () => restore(product.id)

        );

        tbody.appendChild(tr);

    });

}

/* =====================================================
   MODAL
===================================================== */

function openNew(): void {

    editingId = null;

    modalTitle.textContent =
        "Nuevo Producto";

    inputNombre.value = "";

    inputDescripcion.value = "";

    inputPrecio.value = "";

    inputStock.value = "";

    inputImagen.value = "";

    inputDisponible.checked = true;

    if (categories.length > 0) {

        selectCategoria.value =
            String(categories[0].id);

    }

    modal.classList.add("show");

}

function openEdit(product: Product): void {

    editingId = product.id;

    modalTitle.textContent =
        "Editar Producto";

    inputNombre.value =
        product.nombre;

    inputDescripcion.value =
        product.descripcion;

    inputPrecio.value =
        String(product.precio);

    inputStock.value =
        String(product.stock);

    inputImagen.value =
        product.imagen;

    inputDisponible.checked =
        product.disponible;

    if (product.categorias.length > 0) {

        selectCategoria.value =
            String(product.categorias[0].id);

    }

    modal.classList.add("show");

}

function closeModal(): void {

    modal.classList.remove("show");

    editingId = null;

}

/* =====================================================
   BOTONES
===================================================== */

btnNuevo.addEventListener(

    "click",

    openNew

);

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

        if (

            e.key === "Escape"

        )

            closeModal();

    }

);

/* =====================================================
   GUARDAR
===================================================== */

btnGuardar.addEventListener(

    "click",

    () => {

        const nombre =
            inputNombre.value.trim();

        const descripcion =
            inputDescripcion.value.trim();

        const precio =
            Number(inputPrecio.value);

        const stock =
            Number(inputStock.value);

        const imagen =
            inputImagen.value.trim();

        const categoria =

            categories.find(

                c =>

                    c.id ===

                    Number(

                        selectCategoria.value

                    )

            );

        if (

            !nombre ||

            !descripcion ||

            !imagen ||

            !categoria ||

            precio < 0 ||

            stock < 0

        ) {

            showToast(

                "Complete correctamente todos los campos.",

                "warning"

            );

            return;

        }

        if (

            editingId === null

        ) {

            const newProduct: Product = {

                id:

                    Math.max(

                        0,

                        ...products.map(

                            p => p.id

                        )

                    ) + 1,

                eliminado: false,

                createdAt:

                    new Date()

                        .toISOString(),

                nombre,

                descripcion,

                precio,

                stock,

                imagen,

                disponible:

                    inputDisponible.checked,

                categorias: [

                    categoria

                ]

            };

            products.push(

                newProduct

            );

            showToast(

                "Producto creado correctamente.",

                "success"

            );

        }

        else {

            const product =

                products.find(

                    p =>

                        p.id === editingId

                );

            if (

                product

            ) {

                product.nombre =
                    nombre;

                product.descripcion =
                    descripcion;

                product.precio =
                    precio;

                product.stock =
                    stock;

                product.imagen =
                    imagen;

                product.disponible =
                    inputDisponible.checked;

                product.categorias = [

                    categoria

                ];

            }

            showToast(

                "Producto actualizado correctamente.",

                "success"

            );

        }

        saveProducts(

            products

        );

        applyFilters();

        closeModal();

    }

);

/* =====================================================
   FILTROS
===================================================== */

function applyFilters(): void {

    let list = [...products];

    const texto =
        search.value
            .toLowerCase()
            .trim();

    if (texto !== "") {

        list = list.filter(

            p =>

                p.nombre
                    .toLowerCase()
                    .includes(texto)

        );

    }

    if (

        filterCategory.value !== "all"

    ) {

        list = list.filter(

            p =>

                p.categorias.some(

                    c =>

                        c.id ===

                        Number(

                            filterCategory.value

                        )

                )

        );

    }

    switch (

        filterState.value

    ) {

        case "available":

            list = list.filter(

                p =>

                    !p.eliminado &&

                    p.disponible

            );

            break;

        case "unavailable":

            list = list.filter(

                p =>

                    !p.eliminado &&

                    !p.disponible

            );

            break;

        case "deleted":

            list = list.filter(

                p =>

                    p.eliminado

            );

            break;

    }

    render(list);

}

/* =====================================================
   EVENTOS FILTROS
===================================================== */

search.addEventListener(

    "input",

    applyFilters

);

filterCategory.addEventListener(

    "change",

    applyFilters

);

filterState.addEventListener(

    "change",

    applyFilters

);

/* =====================================================
   ELIMINAR
===================================================== */

function remove(id:number):void{

    const product =

        products.find(

            p=>p.id===id

        );

    if(!product)

        return;

    product.eliminado = true;

    saveProducts(products);

    showToast(

        "Producto eliminado.",

        "error"

    );

    applyFilters();

}

/* =====================================================
   RESTAURAR
===================================================== */

function restore(id:number):void{

    const product =

        products.find(

            p=>p.id===id

        );

    if(!product)

        return;

    product.eliminado = false;

    saveProducts(products);

    showToast(

        "Producto restaurado.",

        "success"

    );

    applyFilters();

}

/* =====================================================
   INICIO
===================================================== */

loadData();