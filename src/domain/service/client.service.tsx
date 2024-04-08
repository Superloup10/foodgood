import { ClientRepository } from "@/domain/repository/client.repository";
import { Client } from "@/domain/model/client.dto";

export class ClientService {
  constructor(private readonly repository: ClientRepository) {}

  async getClient(email: string): Promise<Client> {
    const client = await this.repository.getClient(email);
    if (!client) {
      throw new Error(`Le client ${email} n'existe pas !`);
    }
    return client;
  }

  async addClient(
    name: string,
    first_name: string,
    email: string,
    address: string,
    phone: string
  ): Promise<Client> {
    const client = await this.repository.getClient(email);
    if (client) {
      throw new Error("Ce client existe déjà !");
    }
    return this.repository.addClient(name, first_name, email, address, phone);
  }

  async updateClient(
    email: string,
    name?: string,
    first_name?: string,
    address?: string,
    phone?: string
  ): Promise<Client> {
    const client = await this.repository.getClient(email);
    if (!client) {
      throw new Error("Ce client n'existe pas!");
    }
    return this.repository.updateClient(
      email,
      name,
      first_name,
      address,
      phone
    );
  }

  async deleteClient(email: string): Promise<number> {
    const client = await this.repository.getClient(email);
    if (!client) {
      throw new Error("ce client exist pas");
    }
    return this.repository.deleteClient(email);
  }
}
