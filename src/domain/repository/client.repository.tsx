import { Client } from "@/domain/model/client.dto";
import prisma from "@/lib/prismadb";

export class ClientRepository {
  async getClient(email: string): Promise<Client | null> {
    return prisma.client.findUnique({ where: { email } });
  }
  async addClient(
    name: string,
    first_name: string,
    email: string,
    address: string,
    phone?: string
  ): Promise<Client> {
    return prisma.client.create({
      data: { name, first_name, email, address, phone },
    });
  }
  async updateClient(
    email: string,
    name?: string,
    first_name?: string,
    address?: string,
    phone?: string
  ): Promise<Client> {
    return prisma.client.update({
      where: { email },
      data: { name, first_name, email, address, phone },
    });
  }

  async deleteClient(email: string): Promise<number> {
    return (await prisma.client.deleteMany({ where: { email } })).count;
  }
}
