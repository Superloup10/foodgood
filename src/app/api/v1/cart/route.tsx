import { CartController } from "@/controller/cart.controller";
import { CartRepository } from "@/domain/repository/cart.repository";
import { CartService } from "@/domain/service/cart.service";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const controller = new CartController(new CartService(new CartRepository()));

  return controller.getCarts(request);
}

export function POST(request: NextRequest) {
  const controller = new CartController(new CartService(new CartRepository()));
  return controller.addCart(request);
}

export function DELETE (request: NextRequest){
  const controller = new CartController(new CartService(new CartRepository()));
  return controller.deleteCart (request);
}