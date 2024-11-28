import prisma from '../prisma/prisma';
import { jest } from '@jest/globals';
import { GET } from '../src/app/api/bookmarks/route';

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    bookmark: {
      findMany: jest.fn(),
    },
  }
  return {
    __esModule: true,
    PrismaClient: jest.fn(() => mockPrisma)
  }
});

describe('GET /api/bookmarks', () => {

  it('should return 500 if there is an error querying the database', async () => {
    (prisma.bookmark.findMany as jest.MockedFunction<typeof prisma.bookmark.findMany>).mockRejectedValue(new Error('Database Error'));

    const response = await GET();

    expect(response.status).toBe(500);

    expect(await response.json()).toEqual({ error: 'Internal Server Error.' });
  });

  it('should return 200 if it successfully retrieves the bookmarks', async () => {
    interface UserSelect {
      id: string;
      username: string;
      email: string;
    }

    interface BookmarkSelect {
      id: string;
      user: UserSelect;
      creationDate: Date;
    };

    const mockBookmarks: BookmarkSelect[] = [
      {
        id: '1',
        user: {
          id: '1',
          username: 'user1',
          email: 'test@test.com',
        },
        creationDate: new Date(),
      },
    ];

    (prisma.bookmark.findMany as jest.MockedFunction<typeof prisma.bookmark.findMany>).mockResolvedValue(mockBookmarks as any);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockBookmarks.map(bookmark => ({
      id: bookmark.id,
      user: {
        id: bookmark.user.id,
        username: bookmark.user.username,
        email: bookmark.user.email,
      },
      creationDate: new Date(bookmark.creationDate).toISOString()
    })))
  });
});