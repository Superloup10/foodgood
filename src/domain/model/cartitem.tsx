import {Product} from "@/domain/model/product.dto";

export interface CartItem {
    product: Product;
    quantity: number;
}
