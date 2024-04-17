import { ClientService } from "@/domain/service/client.service";
import { NextRequest, NextResponse } from "next/server";

export class ClientController {
  constructor(private readonly service: ClientService) {}

  async getClient(request: NextRequest): Promise<NextResponse> {
    const email = request.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json("Le paramètre email est manquant !");
    }
    const client = await this.service.getClient(email);
    return NextResponse.json(client);
}

  async addClient(request: NextRequest): Promise<NextResponse> {
    const { name, first_name, email, address, phone } = await request.json();
    const client = await this.service.addClient(
      name,
      first_name,
      email,
      address,
      phone
    );
    return NextResponse.json(client);
  }

  async updateClient(request: NextRequest): Promise<NextResponse> {
    const { name, first_name, email, address, phone } = await request.json();
    const updatedClient = await this.service.updateClient(
      email,
      name,
      first_name,
      address,
      phone
    );
    return NextResponse.json(updatedClient);
  }

  async deleteClient(request: NextRequest): Promise<NextResponse> {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json("Le paramètre email est manquant !");
    }
    const count = await this.service.deleteClient(email);
    return NextResponse.json(count);
  }
}

