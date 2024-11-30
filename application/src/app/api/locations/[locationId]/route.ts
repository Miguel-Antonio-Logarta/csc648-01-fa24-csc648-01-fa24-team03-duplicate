import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { del } from "@vercel/blob";
import { DayOfWeek } from "@prisma/client";

export const dynamic = 'force-dynamic'

interface OperatingHour {
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
 * @Endpoint - GET /api/locations/{locationId}
 * @description - Fetches a single location from the database given a location id. 
 * @returns - a single location from the database.
 */
export async function GET(req: NextRequest, { params }: { params: { locationId: string } }) {
    try {
        const locationId = params.locationId;

        if (!locationId) {
            return NextResponse.json({ error: "No locationId provided." }, { status: 400 });
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
                }
            }
        });

        if (!location) {
            return NextResponse.json({ error: "Location not found." }, { status: 404 });
        }

        // Manually sort the operating hours by the numeric day order
        location.operatingHours.sort((a, b) => {
            return dayOrder[a.day] - dayOrder[b.day];
        });
        
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
export async function DELETE(req: NextRequest, { params }: { params: { locationId: string } }) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    try {
        const locationId = params.locationId;

        if (!locationId) {
            return NextResponse.json({ error: "No locationId provided." }, { status: 400 });
        }

        const location = await prisma.location.findFirst({
            where: {
                id: locationId
            }
        });

        if (!location) {
            return NextResponse.json({ error: "Location not found." }, { status: 404 });
        }

        // this only exists for now because we have items in the db that don't have an image
        // if(location.imageWebLink && location.imageWebLink.length !== 0 && location.imageWebLink !== "N/A") {
        //     await del(location.imageWebLink as string);
        // } 

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

/**
 * @Auth - Required to be ADMIN
 * @Endpoint - PATCH /api/locations/{locationId}
 * @description - Updates a single location from the database given a location id.
 * @returns - The updated location.
 */
export async function PATCH(req: NextRequest, { params }: { params: { locationId: string } }) {

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    try {
        const locationId = params.locationId;

        if (!locationId) {
            return NextResponse.json({ error: "No locationId provided." }, { status: 400 });
        }

        const location = await prisma.location.findFirst({
            where: {
                id: locationId
            }
        });

        if (!location) {
            return NextResponse.json({ error: "Location not found." }, { status: 404 });
        }

        // all allowed fields that can be updated.
        const {
            name,
            address,
            phoneNumber,
            hasWifi,
            seatingCapacity,
            category,
            locationWebsiteLink,
            animalFriendliness,
            latitude,
            longitude,
            operatingHours
        } = await req.json();

        // Check if any of the fields are empty.
        if (!name && !address && !phoneNumber && !hasWifi && !seatingCapacity && !category && !locationWebsiteLink && !animalFriendliness && !latitude && !longitude && !operatingHours) {
            return NextResponse.json({ error: "No fields provided to update." }, { status: 400 });
        }

        // ensure that address is unique
        if (address) {
            const existingLocation = await prisma.location.findFirst({
                where: {
                    address: address
                }
            });

            if (existingLocation && existingLocation.id !== locationId) {
                return NextResponse.json({ error: "Location with this address already exists." }, { status: 400 });
            }
        }

        // Update the location with the new fields.
        const updatedLocation = await prisma.location.update({
            where: {
                id: locationId
            },
            data: {
                name: name ? name : location.name,
                address: address ? address : location.address,
                phoneNumber: phoneNumber ? phoneNumber : location.phoneNumber,
                hasWifi: hasWifi ? hasWifi : location.hasWifi,
                seatingCapacity: seatingCapacity ? seatingCapacity : location.seatingCapacity,
                category: category ? category : location.category,
                locationWebsiteLink: locationWebsiteLink ? locationWebsiteLink : location.locationWebsiteLink,
                animalFriendliness: animalFriendliness ? animalFriendliness : location.animalFriendliness,
                latitude: latitude ? latitude : location.latitude,
                longitude: longitude ? longitude : location.longitude,
            }
        });

        // Update the operating hours if they are provided.
        if (operatingHours && operatingHours.length > 0) {
            // delete all operating hours for the location
            await prisma.operatingHours.deleteMany({
                where: {
                    locationId: locationId
                }
            });

            // create new operating hours for the location in parallel
            const operatingHourPromises = operatingHours.map((operatingHour: OperatingHour) =>
                prisma.operatingHours.create({
                    data: {
                        day: operatingHour.day,
                        openTime: operatingHour.openTime,
                        closeTime: operatingHour.closeTime,
                        locationId: locationId
                    }
                })
            );

            // Wait for all operating hour creations to complete
            await Promise.all(operatingHourPromises);
        }


        return NextResponse.json(updatedLocation);
    } catch (err: any) {
        console.log(`[ERROR]: Error in PATCH of api/locations/[locationId]/route.ts: ${err}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }

}