import { Category } from "@/domain/model/category";
import { Product } from "@/domain/model/product.dto";
import { ProductService } from "@/domain/service/product.service";
import { NextRequest, NextResponse } from "next/server";

export class ProductController {
  constructor(private readonly service: ProductService) {}
  async getProducts() {
    const products = await this.service.getProducts();
    return NextResponse.json(products);
  }

  async addProduct(request: NextRequest) {
    const { name, price, amount, image, category } = await request.json();
    const product = await this.service.addProduct(
      name,
      price,
      amount,
      image,
      category
    );
    return NextResponse.json({product});
  }

  async getProduct(request: NextRequest) {
    const name = request.nextUrl.searchParams.get("name")!;
    const product = await this.service.getProduct(name);
    return NextResponse.json(product);
  }

  async updateProduct(request: NextRequest) {
    const { name, price, amount, image, category } = await request.json();
    const product = await this.service.updateProduct(
      name,
      price,
      amount,
      image,
      category
    );

    return NextResponse.json({product});
  }

  async deleteProduct(request: NextRequest) {
    const name = request.nextUrl.searchParams.get("name")!;
    const count = await this.service.deleteProduct(name);
    return NextResponse.json(count);
  }
}
