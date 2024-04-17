import {CartService} from "@/domain/service/cart.service";

import {NextRequest, NextResponse} from "next/server";

export class CartController {
    constructor(private readonly service: CartService) {
    }

    async addCart(request: NextRequest) {
        const {client, cart, created_at} = await request.json();
        if (!client) {
            return NextResponse.json({message: "Client is required."}, {status: 400});
        }
        if (!cart) {
            return NextResponse.json({message: "Cart is required."}, {status: 400});
        }
        await this.service.addCart(client, cart, created_at);
        return NextResponse.json({message: "Cart added successfully."}, {status: 201});
    }

    async getCarts(request: NextRequest) {
        const client_idString = request.nextUrl.searchParams.get("client_id")!;
        const client_id: number = parseInt(client_idString, 10); // Convertit la chaîne en nombre
        const cart = await this.service.getCarts(client_id);
        return NextResponse.json(cart);
    }

    async deleteCart(request: NextRequest) {
        const idString: string = request.nextUrl.searchParams.get("id")!;
        const id: number = parseInt(idString, 10); // Convertir la chaîne en nombre

        const count = await this.service.deleteCart(id);

        return NextResponse.json(count);
    }
}
