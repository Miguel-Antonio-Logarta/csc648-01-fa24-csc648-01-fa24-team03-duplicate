import { Location } from "@prisma/client";
import prisma from '../prisma/prisma';
import { jest } from '@jest/globals';
import { GET, POST } from '../src/app/api/locations/route';
import { NextRequest } from 'next/server';
import { getServerSession } from "next-auth";

// Type for the session object
interface Session {
  user: {
    role: string;
  };
}

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    location: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  }
  return {
    __esModule: true,
    PrismaClient: jest.fn(() => mockPrisma)
  }
});

describe('GET /api/locations', () => {
  it('should return 500 if there is an error querying the database', async () => {
    (prisma.location.findMany as jest.MockedFunction<typeof prisma.location.findMany>).mockRejectedValue(new Error('Database Error'));

    const response = await GET();

    expect(response.status).toBe(500);

    expect(await response.json()).toEqual({ error: 'Internal Server Error.' });
  });

  it('should return 200 if it successfully retrieves the locations', async () => {
    interface OperatingHour {
      day: string;
      openTime: string;
      closeTime: string;
    }

    interface LocationSelect {
      id: string;
      name: string;
      address: string;
      phoneNumber: string;
      hasWifi: boolean;
      seatingCapacity: number;
      category: string;
      rating: number;
      busynessStatus: number;
      imageWebLink: string;
      locationWebsiteLink: string;
      animalFriendliness: boolean;
      latitude: number;
      longitude: number;
      operatingHours: OperatingHour[];
    }

    const mockLocations: LocationSelect[] = [
      {
        id: '1',
        name: 'location1',
        address: '1234 Main St',
        phoneNumber: '123-456-7890',
        hasWifi: true,
        seatingCapacity: 50,
        category: "LIBRARY",
        rating: 4.5,
        busynessStatus: 3,
        imageWebLink: 'www.image.com',
        locationWebsiteLink: 'www.location.com',
        animalFriendliness: true,
        latitude: 123.456,
        longitude: 123.456,
        operatingHours: [
          {
            day: 'Monday',
            openTime: '08:00',
            closeTime: '17:00',
          },
          {
            day: 'Tuesday',
            openTime: '08:00',
            closeTime: '17:00',
          },
          {
            day: 'Wednesday',
            openTime: '08:00',
            closeTime: '17:00',
          },
          {
            day: 'Thursday',
            openTime: '08:00',
            closeTime: '17:00',
          },
          {
            day: 'Friday',
            openTime: '08:00',
            closeTime: '17:00',
          },
          {
            day: 'Saturday',
            openTime: '08:00',
            closeTime: '17:00',
          },
          {
            day: 'Sunday',
            openTime: '08:00',
            closeTime: '17:00',
          },
        ],
      },
    ];

    (prisma.location.findMany as jest.MockedFunction<typeof prisma.location.findMany>).mockResolvedValue(mockLocations as Location[]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockLocations);
  });
});


describe('POST /api/locations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if the user is not an admin', async () => {
    // Explicitly type the return value of getServerSession to avoid the 'never' type
    (getServerSession as jest.MockedFunction<() => Promise<Session>>).mockResolvedValue({
      user: { role: 'CUSTOMER' }, // non-admin user
    });

    // Mock the request body
    const req = {
      json: jest.fn<() => Promise<{}>>().mockResolvedValue({
        id: '1',
        name: 'location1',
        address: '1234 Main St',
        phoneNumber: '123-456-7890',
        hasWifi: true,
        seatingCapacity: 50,
        category: "LIBRARY",
        rating: 4.5,
        busynessStatus: 3,
        imageWebLink: 'www.image.com',
        locationWebsiteLink: 'www.location.com',
        animalFriendliness: true,
        latitude: 123.456,
        longitude: 123.456,
        operatingHours: [
          {
            day: 'Monday',
            openTime: '08:00',
            closeTime: '17:00',
          },
          {
            day: 'Tuesday',
            openTime: '08:00',
            closeTime: '17:00',
          },
          {
            day: 'Wednesday',
            openTime: '08:00',
            closeTime: '17:00',
          },
          {
            day: 'Thursday',
            openTime: '08:00',
            closeTime: '17:00',
          },
          {
            day: 'Friday',
            openTime: '08:00',
            closeTime: '17:00',
          },
          {
            day: 'Saturday',
            openTime: '08:00',
            closeTime: '17:00',
          },
          {
            day: 'Sunday',
            openTime: '08:00',
            closeTime: '17:00',
          },
        ],
      }),
    } as unknown as NextRequest;

    const response = await POST(req);

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: 'Unauthorized.' });
  });

  it('should return 400 if the request body is missing required fields', async () => {
    // Mock the session to simulate an admin user
    (getServerSession as jest.MockedFunction<() => Promise<Session>>).mockResolvedValue({
      user: { role: 'ADMIN' }, // admin user
    });

    // Mock the request body
    const req = {
      json: jest.fn<() => Promise<{}>>().mockResolvedValue({}),
    } as unknown as NextRequest;

    const response = await POST(req);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'Missing or empty fields: name, address, hasWifi, category, animalFriendliness, operatingHours, latitude, longitude, imageWebLink' });
  });

  it('should return 400 if the operatingHours field is not an array or is empty', async () => {
    // Mock the session to simulate an admin user
    (getServerSession as jest.MockedFunction<() => Promise<Session>>).mockResolvedValue({
      user: { role: 'ADMIN' }, // admin user
    });

    // Mock the request body
    const req = {
      json: jest.fn<() => Promise<{}>>().mockResolvedValue({
        name: 'location1',
        address: '1234 Main St',
        hasWifi: true,
        category: "LIBRARY",
        animalFriendliness: true,
        operatingHours: [],
        latitude: 123.456,
        longitude: 123.456,
        imageWebLink: 'www.image.com',
      }),
    } as unknown as NextRequest;

    const response = await POST(req);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'No operating hours provided.' });
  });

  it('should return 400 if the location already exists', async () => {
    // Mock the session to simulate an admin user
    (getServerSession as jest.MockedFunction<() => Promise<Session>>).mockResolvedValue({
      user: { role: 'ADMIN' }, // admin user
    });

    // Mock the request body
    const req = {
      json: jest.fn<() => Promise<{}>>().mockResolvedValue({
        name: 'location1',
        address: '1234 Main St',
        hasWifi: true,
        category: "LIBRARY",
        animalFriendliness: true,
        operatingHours: [
          {
            day: 'Monday',
            openTime: '08:00',
            closeTime: '17:00',
          },
        ],
        latitude: 123.456,
        longitude: 123.456,
        imageWebLink: 'www.image.com',
      }),
    } as unknown as NextRequest;

    (prisma.location.findFirst as jest.MockedFunction<typeof prisma.location.findFirst>).mockResolvedValue({
      id: '1',
      name: 'location1',
      address: '1234 Main St',
      phoneNumber: '123-456-7890',
      hasWifi: true,
      seatingCapacity: 50,
      category: "LIBRARY",
      rating: 4.5,
      busynessStatus: 3,
      imageWebLink: 'www.image.com',
      locationWebsiteLink: 'www.location.com',
      animalFriendliness: true,
      latitude: 123.456,
      longitude: 123.456,
    });

    const response = await POST(req);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'Location already exists.' });
  });
});