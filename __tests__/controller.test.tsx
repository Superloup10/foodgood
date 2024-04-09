import "@testing-library/jest-dom";
import { ClientController } from '@/controller/client.controller';
import { ClientService } from '@/domain/service/client.service';

// Mock ClientService object
const mockClientService = {} as ClientService;

// Mock NextRequest object
const mockRequest: any = {
  nextUrl: new URL('http://example.com?email=test@example.com'),
  json: jest.fn(),
};

// Mock NextResponse object
const mockResponse: any = {
  json: jest.fn(),
};

// Create an instance of ClientController
const clientController = new ClientController(mockClientService);

describe('Client Controller Tests', () => {
  test('GET client should return client data', async () => {
    mockClientService.getClient = jest.fn().mockResolvedValueOnce({}); // Mock the getClient method
    await clientController.getClient(mockRequest);
    expect(mockResponse.json).toHaveBeenCalled();
  });

  test('POST should add a new client', async () => {
    const clientData = {
      name: 'John',
      first_name: 'Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      phone: '555-5555',
    };
    mockRequest.json.mockResolvedValueOnce(clientData);
    mockClientService.addClient = jest.fn().mockResolvedValueOnce({}); // Mock the addClient method
    await clientController.addClient(mockRequest);
    expect(mockResponse.json).toHaveBeenCalled();
  });

  test('PUT should update an existing client', async () => {
    const clientData = {
      name: 'John',
      first_name: 'Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      phone: '555-5555',
    };
    mockRequest.json.mockResolvedValueOnce(clientData);
    mockClientService.updateClient = jest.fn().mockResolvedValueOnce({}); // Mock the updateClient method
    await clientController.updateClient(mockRequest);
    expect(mockResponse.json).toHaveBeenCalled();
  });

  test('DELETE should delete a client', async () => {
    const clientData = {
      email: 'john.doe@example.com',
    };
    mockRequest.json.mockResolvedValueOnce(clientData);
    mockClientService.deleteClient = jest.fn().mockResolvedValueOnce(1); // Mock the deleteClient method
    await clientController.deleteClient(mockRequest);
    expect(mockResponse.json).toHaveBeenCalled();
  });
});

