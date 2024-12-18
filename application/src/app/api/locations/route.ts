import { NextRequest, NextResponse } from "next/server";
import { DayOfWeek, LocationType } from "@prisma/client";
import prisma from "../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export const dynamic = 'force-dynamic'

// defining the expected data for a location
export interface LocationData {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    hasWifi: boolean;
    seatingCapacity: number;
    category: LocationType;
    rating: number;
    busynessStatus: number;
    imageWebLink: string;
    locationWebsiteLink: string;
    animalFriendliness: boolean;
    operatingHours: OperatingHour[];
    latitude: number;
    longitude: number;
}

// defining the expected data for operating hours
export interface OperatingHour {
    day: DayOfWeek;
    openTime: string;
    closeTime: string;
}

// Define the order of the days numerically.
const dayOrder = {
    MONDAY: 0,
    TUESDAY: 1,
    WEDNESDAY: 2,
    THURSDAY: 3,
    FRIDAY: 4,
    SATURDAY: 5,
    SUNDAY: 6
};

/**
 * @Endpoint - GET /api/locations
 * @description - Fetches all locations with their operating hours.
 * @returns - all locations with their operating hours.
 */
export async function GET() {
    try {
        const locations = await prisma.location.findMany({
            include: {
                operatingHours: {
                    select: {
                        day: true,
                        openTime: true,
                        closeTime: true
                    }
                }
            }
        });

        // Manually sort the operating hours by the numeric day order
        locations.forEach(location => {
            location.operatingHours.sort((a, b) => {
                return dayOrder[a.day] - dayOrder[b.day];
            });
        });

        return NextResponse.json(locations);
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/locations/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}

/**
 * @Auth - Required (ADMIN)
 * @Endpoint - POST /api/locations
 * @description - Creates a new location with the provided data.
 * @returns - the newly created location.
 */
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    try {
        const body: LocationData = await req.json();
        const requiredFields: (keyof LocationData)[] = [
            'name',
            'address',
            'hasWifi',
            'category',
            'animalFriendliness',
            'operatingHours',
            'latitude',
            'longitude',
            'imageWebLink'
        ];

        // Check for missing fields and ensure fields are not empty strings
        const missingFields = requiredFields.filter(field => {
            const value = body[field];
            return value === undefined || (typeof value === 'string' && value.trim() === '');
        });

        if (missingFields.length > 0) {
            return NextResponse.json({ error: `Missing or empty fields: ${missingFields.join(', ')}` }, { status: 400 });
        }

        // Ensure operatingHours is an array and not empty
        if (!Array.isArray(body.operatingHours) || body.operatingHours.length === 0) {
            return NextResponse.json({ error: "No operating hours provided." }, { status: 400 });
        }

        const existingLocation = await prisma.location.findFirst({
            where: {
                address: body.address
            }
        });

        if (existingLocation) {
            return NextResponse.json({ error: "Location already exists." }, { status: 400 });
        }



        //do a transaction to create the location and its operating hours in one go
        const location = await prisma.$transaction(async (prisma) => {
            // create location
            const newLocation = await prisma.location.create({
                data: {
                    name: body.name,
                    address: body.address,
                    phoneNumber: body.phoneNumber,
                    hasWifi: body.hasWifi,
                    seatingCapacity: body.seatingCapacity,
                    category: body.category,
                    rating: body.rating,
                    busynessStatus: body.busynessStatus,
                    imageWebLink: body.imageWebLink,
                    locationWebsiteLink: body.locationWebsiteLink,
                    animalFriendliness: body.animalFriendliness,
                    longitude: body.longitude,
                    latitude: body.latitude
                }
            })

            for (const operatingHour of body.operatingHours) {
                await prisma.operatingHours.create({
                    data: {
                        day: operatingHour.day,
                        openTime: operatingHour.openTime,
                        closeTime: operatingHour.closeTime,
                        locationId: newLocation.id
                    }
                });
            }

            return newLocation;
        });

        return NextResponse.json(location, { status: 201 });
    } catch (error: any) {
        console.log(`[ERROR]: Error in POST of api/locations/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}