import type { CartItem } from "./product";

export type OrderStatus =
  | "PENDIENTE"
  | "CONFIRMADO"
  | "TERMINADO"
  | "CANCELADO";

export interface Order {
  id: number;

  userEmail: string;

  fecha: string;

  estado: OrderStatus;

  items: CartItem[];

  total: number;
}