import { Cart } from "@/domain/model/cart.dto";
import { Product } from "@/domain/model/product.dto";

export interface Buy {
  cart_id: number;
  product_id: number;
  cart?: Cart | null;
  product?: Product | null;
}
