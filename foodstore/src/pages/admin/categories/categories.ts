import type { ICategory } from "../../../types/categoria";

import {
    getCategories,
    saveCategories,
    getUser
} from "../../../utils/localStorage";

import { showToast }  from "../../../utils/toast";

import { initNavbar } from "../../../utils/navbar";

initNavbar();

/* =====================================================
   DATOS
===================================================== */

let categories: ICategory[] = [];

let editingId: number | null = null;

/* =====================================================
   ELEMENTOS
===================================================== */

const tbody =
    document.getElementById("categoriesTable") as HTMLElement;

const search =
    document.getElementById("searchCategory") as HTMLInputElement;

const modal =
    document.getElementById("categoryModal") as HTMLElement;

const modalTitle =
    document.getElementById("modalTitle") as HTMLElement;

const inputName =
    document.getElementById("categoryName") as HTMLInputElement;

const btnNueva =
    document.getElementById("btnNuevaCategoria") as HTMLButtonElement;

const btnGuardar =
    document.getElementById("btnGuardar") as HTMLButtonElement;

const btnCancelar =
    document.getElementById("btnCancelar") as HTMLButtonElement;

const welcomeUser =
    document.getElementById("welcomeUser") as HTMLElement;

const inputDescription =document.getElementById("categoryDescription") as HTMLTextAreaElement;

const filter =document.getElementById("filterCategory") as HTMLSelectElement;

const btnCloseModal =document.getElementById("btnCloseModal") as HTMLButtonElement;

/* =====================================================
   BIENVENIDA
===================================================== */

const user = getUser();

if (user && welcomeUser) {

    welcomeUser.textContent =
        `👋 ${user.nombre}`;

}

/* =====================================================
   CARGA
===================================================== */

function loadCategories(): void {

    categories = getCategories();

    applyFilters();

}



/* =====================================================
   RENDER
===================================================== */

function render(list: ICategory[]): void {

    tbody.innerHTML = "";

    list.forEach(category => {

        const tr =
            document.createElement("tr");

        tr.innerHTML = `

            <td>

                ${category.id}

            </td>

            <td>

                    ${category.nombre}

            </td>

            <td>

                    ${category.descripcion}

            </td>

            <td>

                <span class="status ${category.eliminado ? "deleted" : "active"}">

                    ${category.eliminado ? "Eliminada" : "Activa"}

                </span>

            </td>

            <td>

                <div class="actions">

                    <button class="icon-btn edit">

                        <span class="material-symbols-outlined">

                            edit

                        </span>

                    </button>

                    ${
                        category.eliminado
                        ?

                        `

                        <button
                            class="icon-btn restore">

                            <span class="material-symbols-outlined">

                                restore

                            </span>

                        </button>

                        `

                        :

                        `

                        <button
                            class="icon-btn delete">

                            <span class="material-symbols-outlined">

                                delete

                            </span>

                        </button>

                        `

                    }

                </div>

            </td>

        `;

        const btnEdit =
            tr.querySelector(".edit") as HTMLButtonElement;

        btnEdit.addEventListener(

            "click",

            () => openEdit(category)

        );

        if (category.eliminado) {

            const btnRestore =
                tr.querySelector(".restore") as HTMLButtonElement;

            btnRestore.addEventListener(

                "click",

                () => restore(category.id)

            );

        }

        else {

            const btnDelete =
                tr.querySelector(".delete") as HTMLButtonElement;

            btnDelete.addEventListener(

                "click",

                () => remove(category.id)

            );

        }

        tbody.appendChild(tr);

    });

}

/* =====================================================
   BUSCADOR
===================================================== */

function applyFilters(): void {

    const texto =
        search.value.toLowerCase();

    let lista = [...categories];

    if (texto !== "") {

        lista = lista.filter(

            c =>

                c.nombre
                    .toLowerCase()
                    .includes(texto)

        );

    }

    switch(filter.value){

        case "active":

            lista = lista.filter(

                c => !c.eliminado

            );

            break;

        case "deleted":

            lista = lista.filter(

                c => c.eliminado

            );

            break;

    }

    render(lista);

}

search.addEventListener(

    "input",

    applyFilters

);

filter.addEventListener(

    "change",

    applyFilters

);

/* =====================================================
   MODAL
===================================================== */

function openNew(): void {

    editingId = null;

    modalTitle.textContent =
        "Nueva Categoría";

    inputName.value = "";
    inputDescription.value = "";

    modal.classList.add("show");

}

function openEdit(category: ICategory): void {

    editingId = category.id;

    modalTitle.textContent =
        "Editar Categoría";

    inputName.value =
        category.nombre;

    inputDescription.value =
        category.descripcion;

    modal.classList.add("show");

}

function closeModal(): void {

    modal.classList.remove("show");

    inputName.value = "";

    inputDescription.value = "";

    editingId = null;

}

/* =====================================================
   BOTONES
===================================================== */

btnNueva.addEventListener(

    "click",

    openNew

);

btnCancelar.addEventListener(

    "click",

    closeModal

);

btnCloseModal.addEventListener(
    "click",
    closeModal
);

/* =====================================================
   GUARDAR
===================================================== */

btnGuardar.addEventListener(

    "click",

    () => {

        const nombre =
            inputName.value.trim();
        const descripcion =
            inputDescription.value.trim();

        if (nombre === "") {

            showToast("Ingrese un nombre.","warning");

            return;

        }

        if (editingId === null) {

            const newCategory: ICategory = {

                id:

                    Math.max(

                        0,

                        ...categories.map(

                            c => c.id

                        )

                    ) + 1,

                nombre,

                descripcion,

                eliminado: false,

                createdAt:
                    new Date().toISOString()

            };

            categories.push(

                newCategory

            );

        }

        else {

            const category =

                categories.find( c => c.id === editingId);

            if (category) {

                category.nombre = nombre
                category.descripcion = descripcion;
            }

        }

        saveCategories(

            categories

        );

        showToast(

            editingId === null

                ? "Categoría creada correctamente."

                : "Categoría modificada correctamente.",

            "success"

        );

        applyFilters();

        closeModal();


    }

);

/* =====================================================
   BAJA LÓGICA
===================================================== */

function remove(id: number): void {

    const category =

        categories.find(

            c => c.id === id

        );

    if (!category)
        return;

    category.eliminado = true;

    saveCategories(categories);

    showToast(

        "Categoría eliminada.",

        "error"

    );

    applyFilters();

}

/* =====================================================
   RESTAURAR
===================================================== */

function restore(id: number): void {

    const category =

        categories.find(

            c => c.id === id

        );

    if (!category)
        return;

    category.eliminado = false;

    saveCategories(categories);

    showToast(

        "Categoría restaurada.",

        "success"

    );

    applyFilters();

}

/* =====================================================
   CERRAR MODAL
===================================================== */

modal.addEventListener(

    "click",

    (e) => {

        if (e.target === modal) {

            closeModal();

        }

    }

);

document.addEventListener(

    "keydown",

    (e) => {

        if (e.key === "Escape") {

            closeModal();

        }

    }

);

/* =====================================================
   INICIALIZAR
===================================================== */

loadCategories();