import { Cart } from "./cart.dto";

export interface Client {
  id: number;
  name: string;
  first_name: string;
  email: string;
  address: string;
  phone: string | null;
  carts?: Cart[];
}
