import prisma from "@/lib/prismadb";
import {Cart} from "@/domain/model/cart.dto";
import {Buy} from "@/domain/model/buy.dto";

export class CartRepository {
    async getCarts(client_id: number): Promise<Cart[]> {
        return prisma.cart.findMany({
            where: {client_id},
            include: {buys: true},
        });
    }

    async getCart(id: number): Promise<Cart | null> {
        return prisma.cart.findUnique({where: {id}, include: {buys: true}});
    }

    async addCart(
        client_id: number,
        created_at: Date
    ): Promise<Cart> {
        return prisma.cart.create({
            data: {
                client_id,
                created_at
            }
        });
    }

    async addBuy(cart_id: number, product_id: number, product_amount: number): Promise<Buy> {
        return prisma.buy.create({data: {cart_id, product_id, product_amount}});
    }

    async deleteCart(id: number): Promise<number> {
        const deleteResult = await prisma.cart.deleteMany({
            where: {id},
        });
        return deleteResult.count;
    }
}
