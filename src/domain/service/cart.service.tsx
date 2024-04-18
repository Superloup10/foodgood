import {Client} from "@/domain/model/client.dto";
import {CartRepository} from "@/domain/repository/cart.repository";
import {Cart} from "@/domain/model/cart.dto";
import {CartItem} from "@/domain/model/cartitem";

export class CartService {
    constructor(private readonly repository: CartRepository) {
    }

    async addCart(
        client: Client,
        cartItems: CartItem[],
        created_at: Date
    ): Promise<Cart | null> {
        const cart = await this.repository.addCart(client.id, created_at);
        for (const cartItem of cartItems) {
            await this.repository.addBuy(cart.id, cartItem.product.id, cartItem.quantity);
        }
        return this.repository.getCart(cart.id);
    }

    async getCarts(client_id: number): Promise<Cart[]> {
        return this.repository.getCarts(client_id);
    }

    async deleteCart(id: number): Promise<number> {
        const cart = await this.repository.getCart(id);
        if (!cart) {
            throw new Error(`Le panier ${id} n'existe pas !`);
        }
        return this.repository.deleteCart(id);
    }
}
