import { Review } from "@prisma/client";
import prisma from '../prisma/prisma';
import { jest } from '@jest/globals';
import { GET } from '../src/app/api/reviews/route';

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    review: {
      findMany: jest.fn(),
    },
  }
  return {
    __esModule: true,
    PrismaClient: jest.fn(() => mockPrisma)
  }
});

describe('GET /api/reviews', () => {

  it('should return 500 if there is an error querying the database', async () => {
    (prisma.review.findMany as jest.MockedFunction<typeof prisma.review.findMany>).mockRejectedValue(new Error('Database Error'));

    const response = await GET();

    expect(response.status).toBe(500);

    expect(await response.json()).toEqual({ error: 'Internal Server Error.' });
  });

  it('should return 200 if it successfully retrieves the reviews', async () => {
    interface ReviewSelect {
      id: string;
      rating: number;
      busynessStatus: number;
      content: string;
      creationDate: string;
    }

    const mockReviews: ReviewSelect[] = [
      {
        id: '1',
        rating: 3,
        busynessStatus: 5,
        content: 'This is a review.',
        creationDate: '2021-09-01T00:00:00.000Z',
      },
    ];

    (prisma.review.findMany as jest.MockedFunction<typeof prisma.review.findMany>).mockResolvedValue(mockReviews as any);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockReviews.map(review => ({
      id: review.id,
      rating: review.rating,
      busynessStatus: review.busynessStatus,
      content: review.content,
      creationDate: new Date(review.creationDate).toISOString()
    })))
  });

});