import { UserService } from "../services/user.service";
import { ProductService } from "../services/product.service";
import { CategoryService } from "../services/category.service";
import { OrderService } from "../services/order.service";

import {
    getUsers,
    saveUsers,
    getProducts,
    saveProducts,
    getCategories,
    saveCategories,
    getOrders,
    saveOrders
} from "./localStorage";

export async function bootstrap(): Promise<void> {

    // ==========================
    // Usuarios
    // ==========================

    if (getUsers().length === 0) {

        saveUsers(
            await UserService.getAll()
        );

    }

    // ==========================
    // Productos
    // ==========================

    if (getProducts().length === 0) {

        saveProducts(
            await ProductService.getAll()
        );

    }

    // ==========================
    // Categorías
    // ==========================

    if (getCategories().length === 0) {

        saveCategories(
            await CategoryService.getAll()
        );

    }

    // ==========================
    // Pedidos
    // ==========================

    if (getOrders().length === 0) {

        saveOrders(
            await OrderService.getAll()
        );

    }

}