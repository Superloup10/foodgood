import bcrypt from 'bcrypt';
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
    try {
      const { name, first_name, email, address, password, phone } = await request.json();
      
      const hashedPassword = await bcrypt.hash(password, 10); // Hacher le mot de passe avec un coût de hachage de 10
      
      const client = await this.service.addClient(
        name,
        first_name,
        email,
        address,
        hashedPassword, // Utiliser le mot de passe haché
        phone
      );
      return NextResponse.json(client);
    } catch (error) {
      console.error("Erreur lors de l'ajout du client :", error);
      return NextResponse.json({ error: "Une erreur s'est produite lors de l'inscription." }, { status: 500 });
    }
  }

  async updateClient(request: NextRequest): Promise<NextResponse> {
    const { name, first_name, email, address, password, phone } = await request.json();
    
    const hashedPassword = await bcrypt.hash(password, 10); // Hacher le mot de passe
    
    const updatedClient = await this.service.updateClient(
      email,
      name,
      first_name,
      address,
      phone,
      hashedPassword // Utiliser le mot de passe haché
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
