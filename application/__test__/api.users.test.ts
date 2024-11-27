import { PrismaClient, User } from '@prisma/client';
import { jest } from '@jest/globals';
import { GET } from '../src/app/api/users/route';
import { getServerSession } from "next-auth";
import prisma from '../prisma/prisma';

// Type for the session object
interface Session {
  user: {
    role: string;
  };
}


jest.mock('@prisma/client', () => {
  const mockPrisma = {
    user: {
      findMany: jest.fn(),
    },
  }
  return {
    __esModule: true,
    PrismaClient: jest.fn(() => mockPrisma)
  }
});

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

describe('GET /api/users', () => {

  it('should return 500 if there is an error querying the database', async () => {
    // Mock the database error
    (prisma.user.findMany as jest.MockedFunction<typeof prisma.user.findMany>).mockRejectedValue(new Error('Database Error'));

    // Call the GET function
    const response = await GET();

    // Assert the status code
    expect(response.status).toBe(500);

    // Assert the response body
    expect(await response.json()).toEqual({ error: 'Internal Server Error.' });
  });

  it('should return 200 if it successfully retrieves the users', async () => {
    interface UserSelect {
      id: string;
      username: string;
      email: string;
      role: string;
      creationDate: Date;
    }
    
    const mockUsers: UserSelect[] = [
      {
        id: '1',
        username: 'user1',
        email: 'test1@test.com',
        role: 'CUSTOMER',
        creationDate: new Date('2024-11-27T20:38:45.177Z'),
      },
      {
        id: '2',
        username: 'user2',
        email: 'test2@test.com',
        role: 'CUSTOMER',
        creationDate: new Date('2024-11-27T20:38:45.177Z'),
      },
    ];


    // Mock the database response | I hate typescript making this so hard
    (prisma.user.findMany as jest.MockedFunction<typeof prisma.user.findMany>).mockResolvedValue(mockUsers as User[]);

    const response = await GET();
    const data = await response.json();

    // Assert the status code
    expect(response.status).toBe(200);

    // Assert the response body
    expect(data).toEqual(
      mockUsers.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        creationDate: user.creationDate?.toISOString(), // Normalize to ISO string
      })));

  });
});