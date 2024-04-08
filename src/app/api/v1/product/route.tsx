import { ProductController } from "@/controller/product.controller";
import { ProductRepository } from "@/domain/repository/product.repository";
import { ProductService } from "@/domain/service/product.service";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const controller = new ProductController(
    new ProductService(new ProductRepository())
  );
  return controller.getProduct(request);
}
