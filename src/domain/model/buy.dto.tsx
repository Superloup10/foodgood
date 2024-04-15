import { Cart } from "./cart.dto";
import { Product } from "./product.dto";

export interface Buy {
  cart_id: number;
  product_id: number;
  cart?: Cart | null;
  product: Product | null;
}
