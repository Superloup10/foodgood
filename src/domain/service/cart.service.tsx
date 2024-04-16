
import { Client } from "../model/client.dto";
import { CartRepository } from "../repository/cart.repository";
import { Cart } from "../model/cart.dto";
import { Product } from "../model/product.dto";

export class CartService {
  constructor(private readonly repository: CartRepository) {}

  async addCart(
    client: Client,
    productsAmounts: [Product, number][],
    created_at: Date
  ): Promise<Cart | null> {
    let result: Cart | null = null;
    for (const productsAmount of productsAmounts) {
      result = await this.repository.addCart(client.id, productsAmount[0].id, productsAmount[1], created_at);
    }
    return result;
  }


  async getCarts(client_id:number): Promise<Cart[] | null> {
    
    return this.repository.getCarts(client_id);
  }


  async deleteCart(id:number):Promise<number> {
    const cart = await this.repository.getCarts (id)
    if(!cart){
      throw new Error(`Le panier ${id} n'existe pas !`);
    }
        return this.repository.deleteCart (id);
  }

  
}
