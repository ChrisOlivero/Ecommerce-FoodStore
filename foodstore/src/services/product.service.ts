import { BaseService } from "./BaseService";
import type { Product } from "../types/product";

export class ProductService extends BaseService<Product> {

  private static readonly PATH = "/data/productos.json";

  static async getAll(): Promise<Product[]> {

    const service = new ProductService();

    const jsonProducts: any[] = await service.getData(this.PATH);

    return jsonProducts.map((p) => ({
      id: p.id,
      eliminado: false,
      createdAt: new Date().toISOString(),

      nombre: p.nombre,
      precio: p.precio,
      descripcion: p.descripcion,
      stock: p.stock,
      imagen: p.imagen,
      disponible: p.disponible,

      categorias: [
        {
          id: p.categoria.id,
          eliminado: false,
          createdAt: new Date().toISOString(),
          nombre: p.categoria.nombre,
          descripcion: p.categoria.descripcion
        }
      ]
    }));
  }

}