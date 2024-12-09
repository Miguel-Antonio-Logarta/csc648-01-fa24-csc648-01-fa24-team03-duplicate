import { jest } from '@jest/globals';
import { GET } from '../src/app/api/analytics/route';
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
        location: {
        count: jest.fn(),
        },
        user: {
        count: jest.fn(),
        },
        review: {
        count: jest.fn(),
        },
        bookmark: {
        count: jest.fn(),
        }
    }
    return {
        __esModule: true,
        PrismaClient: jest.fn(() => mockPrisma)
    }
});

jest.mock('next-auth', () => ({
    getServerSession: jest.fn(),
}));

describe('GET /api/analytics', () => {
    it('should return 401 if the user is not an admin', async () => {
      // Explicitly type the return value of getServerSession to avoid the 'never' type
    (getServerSession as jest.MockedFunction<() => Promise<Session>>).mockResolvedValue({
        user: { role: 'CUSTOMER' }, // non-admin user
      });
  
      const response = await GET();
  
      expect(response.status).toBe(401);
      expect(await response.json()).toEqual({ error: 'Unauthorized.' });
    });
  
    it('should return analytics data when the user is an admin', async () => {
      // Mock the session to simulate an admin user
      (getServerSession as jest.MockedFunction<() => Promise<Session>>).mockResolvedValue({
        user: { role: 'ADMIN' }, // admin user
      });
  
      // Mock the prisma counts
      (prisma.location.count as jest.Mock<() => Promise<number>>).mockResolvedValue(10);
      (prisma.user.count as jest.Mock<() => Promise<number>>).mockResolvedValue(5);
      (prisma.review.count as jest.Mock<() => Promise<number>>).mockResolvedValue(20);
      (prisma.bookmark.count as jest.Mock<() => Promise<number>>).mockResolvedValue(15);
  
      const response = await GET();
      const data = await response.json();
  
      expect(response.status).toBe(200);
      expect(data).toEqual({
        numOfLocations: 10,
        numOfUsers: 5,
        numOfReviews: 20,
        numOfBookmarks: 15,
      });
    });
  
    it('should return 500 if there is an error in querying the database', async () => {
      // Mock the session to simulate an admin user
      (getServerSession as jest.MockedFunction<() => Promise<Session>>).mockResolvedValue({
        user: { role: 'ADMIN' },
      });
  
      // Simulate an error in prisma
      (prisma.location.count as jest.Mock<() => Promise<number>>).mockRejectedValue(new Error('Database error'));
  
      const response = await GET();
  
      expect(response.status).toBe(500);
      expect(await response.json()).toEqual({ error: 'Internal Server Error.' });
    });
  });
