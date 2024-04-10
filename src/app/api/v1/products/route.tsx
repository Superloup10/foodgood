import { ProductController } from "@/controller/product.controller";
import { ProductRepository } from "@/domain/repository/product.repository";
import { ProductService } from "@/domain/service/product.service";
import { NextRequest } from "next/server";

export function GET() {
  const controller = new ProductController(
    new ProductService(new ProductRepository())
  );
  return controller.getProducts();
}

export async function POST(request: NextRequest) {
  const controller = new ProductController(
    new ProductService(new ProductRepository())
  );
  return controller.addProduct(request);
}

export async function PUT(request: NextRequest) {
  const controller = new ProductController(
    new ProductService(new ProductRepository())
  );
  return controller.updateProduct(request);
}

export async function DELETE(request: NextRequest) {
  const controller = new ProductController(
    new ProductService(new ProductRepository())
  );
  return controller.deleteProduct(request);
}
