/*
import { GET, POST, PUT, DELETE } from '@/app/api/v1/client/route';
import { ClientController } from '@/controller/client.controller';
import { NextRequest, NextResponse } from 'next/server';

jest.mock('@/controller/client.controller');

const getMockRequest: NextRequest = { nextUrl:{searchParams:{get:jest.fn().mockReturnValue('test@gmail.com')}} }as unknown as NextRequest;
const postMockRequest: NextRequest = {} as NextRequest;
const putMockRequest: NextRequest = {} as NextRequest;
const deleteMockRequest: NextRequest = {} as NextRequest;

const mockResponse: NextResponse = {} as NextResponse;

describe('Client Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET should return client data', async () => {
    
    await GET(getMockRequest);
    expect(ClientController.prototype.getClient).toHaveBeenCalledWith(getMockRequest);
  });

  test('POST should add a new client', async () => {
    await POST(postMockRequest);
    expect(ClientController.prototype.addClient).toHaveBeenCalledWith(postMockRequest);
  });

  test('PUT should update an existing client', async () => {
    await PUT(putMockRequest);
    expect(ClientController.prototype.updateClient).toHaveBeenCalledWith(putMockRequest);
  });

  test('DELETE should delete a client', async () => {
    await DELETE(deleteMockRequest);
    expect(ClientController.prototype.deleteClient).toHaveBeenCalledWith(deleteMockRequest);
  });
});
*/