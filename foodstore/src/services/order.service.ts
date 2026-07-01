import { BaseService } from "./BaseService";
import type { Order } from "../types/order";
import type { CartItem } from "../types/product";


export class OrderService extends BaseService<Order> {

    private static readonly PATH = "/data/pedidos.json";

    static async getAll(): Promise<Order[]> {

        const service = new OrderService();

        const json: any[] = await service.getData(this.PATH);

        return json.map(order => ({

            id: order.id,

            fecha: order.fecha,

            estado:order.estado,

            total: order.total,

            userEmail: order.usuarioDto.mail,

            items: order.detalles.map((detalle: any): CartItem => ({

                id: detalle.producto.id,

                nombre: detalle.producto.nombre,

                precio: detalle.producto.precio,

                cantidad: detalle.cantidad

            }))

        }));

    }

}