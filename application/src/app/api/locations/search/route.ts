import { NextRequest, NextResponse } from "next/server";
import { DayOfWeek, LocationType } from "@prisma/client";
import prisma from "../../../../../prisma/prisma";

export const dynamic = 'force-dynamic'

// defining the expected data for a location
export interface LocationData {
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
}

// defining the expected data for operating hours
export interface OperatingHour {
    day: DayOfWeek;
    openTime: string;
    closeTime: string;
}

/**
 * @Endpoint - /api/locations/search
 * @description - get all locations that match the search criteria by appending 
 * ?name=...&category=...&hasWifi=...&busynessStatus=...&radius=... to the URL
 * @param req - the request object
 * @returns - a list of locations that match the search criteria
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.nextUrl);
        const name = searchParams.get('name');
        const category = searchParams.get('category');
        const hasWifi = searchParams.get('hasWifi');
        const busynessStatus = searchParams.get('busynessStatus');
        const radius = searchParams.get('radius');

        // get all locations that match the search criteria
        const filter: {
            name?: { contains: string, mode: 'insensitive' },
            category?: LocationType,
            hasWifi?: boolean,
            busynessStatus?: number,
            radius?: number
        } = {};

        if (name) filter.name = { contains: name, mode: 'insensitive' };
        if (category) filter.category = category as LocationType;
        if (hasWifi) filter.hasWifi = hasWifi === 'true';
        if (busynessStatus) filter.busynessStatus = parseInt(busynessStatus);
        if (radius) filter.radius = parseInt(radius);

        const locations = await prisma.location.findMany({
            where: filter,
            include: { operatingHours: true }
        });

        // return the locations
        return NextResponse.json(locations);
    } catch (error: any) {
        console.log("[ERROR]: Error in GET of api/locations/search/route.ts: ", error);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}