import type { IUser } from "../types/IUser";
import type { Order } from "../types/order";
import type { Product } from "../types/product";
import type { ICategory } from "../types/categoria";

/* ===========================
   USUARIOS
=========================== */

export const getUsers = (): IUser[] =>
    JSON.parse(localStorage.getItem("users") || "[]");

export const saveUsers = (users: IUser[]): void =>
    localStorage.setItem("users", JSON.stringify(users));

/* ===========================
   USUARIO ACTIVO
=========================== */

export const getUser = (): IUser | null => {

    const data = localStorage.getItem("userData");

    return data ? JSON.parse(data) : null;

};

export const saveUser = (user: IUser): void =>
    localStorage.setItem("userData", JSON.stringify(user));

export const removeUser = (): void =>
    localStorage.removeItem("userData");

/* ===========================
   PEDIDOS
=========================== */

export const getOrders = (): Order[] =>
    JSON.parse(localStorage.getItem("orders") || "[]");

export const saveOrders = (orders: Order[]): void =>
    localStorage.setItem("orders", JSON.stringify(orders));

/* ===========================
   PRODUCTOS
=========================== */

export const getProducts = (): Product[] =>
    JSON.parse(localStorage.getItem("products") || "[]");

export const saveProducts = (products: Product[]): void =>
    localStorage.setItem("products", JSON.stringify(products));

/* ===========================
   CATEGORIAS
=========================== */

export const getCategories = (): ICategory[] =>
    JSON.parse(localStorage.getItem("categories") || "[]");

export const saveCategories = (categories: ICategory[]): void =>
    localStorage.setItem("categories", JSON.stringify(categories));