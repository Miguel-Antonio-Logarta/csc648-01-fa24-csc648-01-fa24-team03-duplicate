import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";

export const dynamic = 'force-dynamic'

/**
 * @Endpoint - GET /api/bookmarks/locationBookmarks/{locationId}
 * @description - Fetches all bookmarks for a specific location given its id. 
 * @returns - all bookmarks for a specific location given its id.
 */
export async function GET(req: NextRequest, { params }: { params: { locationId: string } }) {
    try {
        const locationId = params.locationId;

        const bookmarks = await prisma.bookmark.findMany({
            where: {
                locationId: locationId
            },
            select: {
                id: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                },
                creationDate: true
            }
        });

        if (!bookmarks || bookmarks.length === 0) {
            return NextResponse.json({ error: 'No bookmarks found for this location.' }, { status: 200 });
        }

        return NextResponse.json(bookmarks);
    } catch (error : any) {
        console.log(`[ERROR]: Error in GET of api/bookmarks/locationBookmarks/[locationId]/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}