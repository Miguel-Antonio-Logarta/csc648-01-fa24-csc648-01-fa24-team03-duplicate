import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { del } from "@vercel/blob";

export const dynamic = 'force-dynamic'

/**
 * @Endpoint - GET /api/locations/{locationId}
 * @description - Fetches a single location from the database given a location id. 
 * @returns - a single location from the database.
 */
export async function GET(req: NextRequest, { params }: { params: { locationId : string }}) {
    try {
        const locationId = params.locationId;

        if(!locationId) {
            return NextResponse.json({ error: "No locationId provided." }, { status: 400});
        }
        
        const location = await prisma.location.findUnique({
            where: {
                id: locationId
            },
            include: {
                operatingHours: {
                    select: {
                        day: true,
                        openTime: true,
                        closeTime: true
                    },
                    orderBy: { 
                        // Need to order the operating hours by day of the week, starting from Monday
                        // One would think we would do this by day: 'asc', but that doesn't work
                        id: 'asc'
                    }
                }
            }
        });

        if(!location) {
            return NextResponse.json({ error: "Location not found." }, { status: 404});
        }

        return NextResponse.json(location);
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/locations/[locationId]/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}

/**
 * @Auth - Required to be ADMIN
 * @Endpoint - DELETE /api/locations/{locationId}
 * @description - Deletes a single location from the database given a location id as well as the image in vercel blob.
 * @returns - The deleted location.
 */
export async function DELETE(req: NextRequest, { params } : { params: { locationId : string}}) {
    const session = await getServerSession(authOptions);

    if(!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    try {
        const locationId = params.locationId;

        if(!locationId) {
            return NextResponse.json({ error: "No locationId provided." }, { status: 400 });
        }

        const location = await prisma.location.findFirst({
            where: {
                id: locationId
            }
        });

        if(!location) {
            return NextResponse.json({ error: "Location not found." }, { status: 404 });
        }

        await del(location.imageWebLink as string);

        const deletedLocation = await prisma.location.delete({
            where: {
                id: locationId
            }
        });

        return NextResponse.json(deletedLocation);
    } catch (err: any) {
        console.log(`[ERROR]: Error in DELETE of api/locations/[locationId]/route.ts: ${err}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}