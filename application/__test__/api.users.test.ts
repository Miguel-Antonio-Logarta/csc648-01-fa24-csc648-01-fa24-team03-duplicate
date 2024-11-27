import { User } from '@prisma/client';
import { jest } from '@jest/globals';
import { GET, POST } from '../src/app/api/users/route';
import { NextRequest } from 'next/server';
import prisma from '../prisma/prisma';
import bcrypt from 'bcryptjs';

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    user: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
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

jest.mock('bcryptjs');

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

describe('POST /api/users', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if password is missing', async () => {
    const req = {
      json: jest.fn<() => Promise<{ username: string }>>().mockResolvedValue({ username: 'testuser' }) // Missing password
    } as unknown as NextRequest;

    const response = await POST(req);
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data).toEqual({ error: 'Missing fields: password' });
  });


  it('should return an error if password is less than 6 characters', async () => {
    const req = {
      json: jest.fn<() => Promise<{ username: string; password: string; email: string }>>().mockResolvedValue({
        username: 'testuser',
        password: '123',
        email: 'test@example.com',
      }),
    } as unknown as NextRequest;

    const response = await POST(req);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toEqual({ error: 'Password must be at least 6 characters long.' });
  });

  it('should return an internal server error if something goes wrong', async () => {
    const req = {
      json: jest.fn<() => Promise<{ username: string; password: string; email: string }>>().mockResolvedValue({
        username: 'erroruser',
        password: 'password123',
        email: 'error@example.com',
      }),
    } as unknown as NextRequest;
  
    (prisma.user.create as jest.MockedFunction<typeof prisma.user.create>).mockRejectedValue(new Error('Database error'));
  
    const response = await POST(req);
    const data = await response.json();
    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Internal Server Error.' });
  });
});