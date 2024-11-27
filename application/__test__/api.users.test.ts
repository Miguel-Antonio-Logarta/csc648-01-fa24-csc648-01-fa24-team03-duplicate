import { PrismaClient, User } from '@prisma/client';
import { jest } from '@jest/globals';
import { GET } from '../src/app/api/users/route';

// witchcraft?
jest.mock('@prisma/client', () => {
  const mockPrisma = {
    user: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }
  }
  return {
    __esModule: true,
    PrismaClient: jest.fn(() => mockPrisma)
  }
});

// testing /api/users GET
test('Get All Users', async () => {
  const prisma = new PrismaClient();

  const mockInput: User[] = [
    { id: '1', username: 'john_doe', email: 'john@example.com', password: "123456", role: 'CUSTOMER', creationDate: new Date('2024-01-01'), settingsId: null },
    { id: '2', username: 'jane_doe', email: 'jane@example.com', password: "123456", role: 'CUSTOMER', creationDate: new Date('2024-02-01'), settingsId: null }
  ];

  const expectedMockResult: { 
    id: string; 
    username: string; 
    email: string | null; 
    password: string; 
    role: string; 
    creationDate: string; // Change to string here
    settingsId: string | null; 
  }[] = [
    { id: '1', username: 'john_doe', email: 'john@example.com', password: "123456", role: 'CUSTOMER', creationDate: "2024-01-01T00:00:00.000Z", settingsId: null },
    { id: '2', username: 'jane_doe', email: 'jane@example.com', password: "123456", role: 'CUSTOMER', creationDate: "2024-02-01T00:00:00.000Z", settingsId: null }
  ];

  (prisma.user.findMany as jest.MockedFunction<typeof prisma.user.findMany>).mockResolvedValue(mockInput);

  const response = await GET();
  const data = await response.json();
  


  expect(data).toEqual(expectedMockResult);
  expect(response.status).toBe(200);
});
