import { Product } from "@/domain/model/product.dto";
import prisma from "@/lib/prismadb";
import { Category } from "@/domain/model/category";

export class ProductRepository {
  async getProducts(): Promise<Product[]> {
    return prisma.product.findMany({ orderBy: { id: "asc" } });
  }
  async addProduct(
    name: string,
    price: number,
    amount: number,
    image: string,
    category: Category
  ): Promise<Product> {
    return prisma.product.create({
      data: { name, price, amount, image, category },
    });
  }

  async getProduct(name: string): Promise<Product | null> {
    return prisma.product.findFirst({
      where: { name },
    });
  }

  async updateProduct(
    name: string,
    price?: number,
    amount?: number,
    image?: string,
    category?: Category
  ): Promise<Product | null> {
    const dataToUpdate: any = {};
    if (price !== undefined) {
      dataToUpdate.price = price;
    }
    if (amount !== undefined) {
      dataToUpdate.amount = amount;
    }
    if (image !== undefined) {
      dataToUpdate.image = image;
    }
    if (category !== undefined) {
      dataToUpdate.category = category;
    }

    return prisma.product.update({
      where: { name },
      data: dataToUpdate,
    });
  }

  async deleteProduct(name: string): Promise<number> {
    const deleteResult = await prisma.product.deleteMany({
      where: { name },
    });

    return deleteResult.count;
  }
}
