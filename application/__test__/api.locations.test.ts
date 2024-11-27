import { Location } from "@prisma/client";
import prisma from '../prisma/prisma';
import { jest } from '@jest/globals';
import { GET, OperatingHour } from '../src/app/api/locations/route';

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    location: {
      findMany: jest.fn(),
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
