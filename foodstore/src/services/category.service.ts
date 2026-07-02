import { BaseService } from "./BaseService";
import type { ICategory } from "../types/categoria";

export class CategoryService extends BaseService<ICategory> {

    private static readonly PATH = "/data/categorias.json";

    static async getAll(): Promise<ICategory[]> {

        const service = new CategoryService();

        const json: any[] = await service.getData(this.PATH);

        return json.map(c => ({

            id: c.id,
            eliminado: false,
            createdAt: new Date().toISOString(),
            nombre: c.nombre,
            descripcion: c.descripcion

        }));

    }

}