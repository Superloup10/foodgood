import {Cart} from "@/domain/model/cart.dto";

export interface Client {
    id: number;
    name: string;
    first_name: string;
    email: string;
    address: string;
    phone?: string | null;
    hash_password: string;
    carts?: Cart[];
}
