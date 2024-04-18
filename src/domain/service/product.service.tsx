import { Category } from "@/domain/model/category";
import { Product } from "@/domain/model/product.dto";
import { ProductRepository } from "@/domain/repository/product.repository";

export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  getProducts(): Promise<Product[]> {
    return this.repository.getProducts();
  }

  async addProduct(
    name: string,
    price: number,
    amount: number,
    image: string,
    category: Category
  ): Promise<Product> {
    const product = await this.repository.getProduct(name);
    if (product) {
      throw new Error(`Le produit ${name} existe déjà !`);
    }
    return this.repository.addProduct(name, price, amount, image, category);
  }

  async getProduct(name: string): Promise<Product> {
    const product = await this.repository.getProduct(name);
    if(!product) {
      throw new Error(`Le produit ${name} n'existe pas !`);
    }
    return product;
  }

  async updateProduct(
    name: string,
    price?: number,
    amount?: number,
    image?: string,
    category?: Category
  ): Promise<Product | null> {
    if (amount !== undefined && amount < 0) {
      throw new Error(`La quantité ne peut pas être inférieure à zéro !`);
    }
    const product = await this.repository.getProduct(name);
    if (!product) {
      throw new Error(`Le produit ${name} n'existe pas !`);
    }
    return this.repository.updateProduct(name, price, amount, image, category);
  }

  async deleteProduct(name: string): Promise<number> {
    const product = await this.repository.getProduct(name);
    if (!product) {
      throw new Error(`Le produit ${name} n'existe pas !`);
    }
    return this.repository.deleteProduct(name);
  }
}
