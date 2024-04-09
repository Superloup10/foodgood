import { GET, POST, PUT, DELETE } from '@/app/api/v1/client/route';
import { ClientController } from '@/controller/client.controller';
import { ClientRepository } from '@/domain/repository/client.repository';
import { ClientService } from '@/domain/service/client.service';
import { NextRequest, NextResponse } from 'next/server';

jest.mock('@/controller/client.controller');

const mockRequest: NextRequest = {} as NextRequest;
const mockResponse: NextResponse = {} as NextResponse;

describe('Client Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET should return client data', async () => {
    await GET(mockRequest);
    expect(ClientController.prototype.getClient).toHaveBeenCalledWith(mockRequest);
  });

  test('POST should add a new client', async () => {
    await POST(mockRequest);
    expect(ClientController.prototype.addClient).toHaveBeenCalledWith(mockRequest);
  });

  test('PUT should update an existing client', async () => {
    await PUT(mockRequest);
    expect(ClientController.prototype.updateClient).toHaveBeenCalledWith(mockRequest);
  });

  test('DELETE should delete a client', async () => {
    await DELETE(mockRequest);
    expect(ClientController.prototype.deleteClient).toHaveBeenCalledWith(mockRequest);
  });
});
