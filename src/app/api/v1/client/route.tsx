import { ClientController } from "@/controller/client.controller";
import { ClientRepository } from "@/domain/repository/client.repository";
import { ClientService } from "@/domain/service/client.service";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const controller = new ClientController(
    new ClientService(new ClientRepository())
  );
  return controller.getClient(request);
}

export function POST(request: NextRequest) {
  const controller = new ClientController(
    new ClientService(new ClientRepository())
  );
  return controller.addClient(request);
}

export function PUT(request: NextRequest) {
  const controller = new ClientController(
    new ClientService(new ClientRepository())
  );
  return controller.updateClient(request);
}

export function DELETE(request: NextRequest) {
  const controller = new ClientController(
    new ClientService(new ClientRepository())
  );
  return controller.deleteClient(request);
}
