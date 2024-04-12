import prisma from "@/lib/prismadb";
import { Cart } from "../model/cart.dto";


export class CartRepository {
  async getCarts(client_id: number): Promise<Cart[] | null> {
    return prisma.cart.findMany({
      where: { client_id },
    });
  }
  async addCart(
    client_id: number,
    Product_id: number,
    created_at: Date
  ): Promise<Cart>{
    return prisma.cart.create({
      data:{client_id,created_at}
    })
  }
  async deleteCart (id:number): Promise<number> {
    const deleteResult = await prisma.cart.deleteMany({
      where: {id},
     
    })
    return deleteResult.count;
  }
  

}
