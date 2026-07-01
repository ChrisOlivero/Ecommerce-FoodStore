import { BaseService } from "./BaseService";
import type { IUser } from "../types/IUser";

export class UserService extends BaseService<IUser> {

  private static readonly PATH = "/data/usuarios.json";

  static async getAll(): Promise<IUser[]> {

    const service = new UserService();

    const jsonUsers: any[] = await service.getData(this.PATH);

    return jsonUsers.map((u) => ({
      nombre: u.nombre,
      email: u.mail,
      password: u.password,
      loggedIn: false,
      role: u.rol === "ADMIN" ? "admin" : "client"
    }));
  }
}