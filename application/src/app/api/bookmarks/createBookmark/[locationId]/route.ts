import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";

// defining the data that is required to create a bookmark.
interface BookmarkData {
    userId: string;
}

/**
 * @Endpoint - POST /api/bookmarks/createBookmark/{locationId}
 * @description - Creates a bookmark for a specific location given its id.
 * @returns - the newly created bookmark.
 */
export async function POST(req: NextRequest, { params }: { params: { locationId: string } }) {
    try {
        const body: BookmarkData = await req.json();
        const requiredFields: (keyof BookmarkData)[] = [
            'userId'
        ]

        const missingFields = requiredFields.filter(field => !body[field] === undefined);

        if (missingFields.length > 0) {
            return NextResponse.json({ error: `Missing fields: ${missingFields.join(', ')}` }, { status: 400 });
        }
        
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
            return NextResponse.json({ error: "Location does not exist." }, { status: 400 });
        }

        // realistcally this would not be needed to be included, but i dont have auth setup yet
        const user = await prisma.user.findFirst({
            where: {
                id: body.userId
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User does not exist." }, { status: 400 });
        }

        // check if bookmark already exists
        const existingBookmark = await prisma.bookmark.findFirst({
            where: {
                locationId: locationId,
                userId: body.userId
            }
        });

        if(existingBookmark) {
            return NextResponse.json({ error: "Bookmark already exists." }, { status: 400 });
        }

        const bookmark = await prisma.bookmark.create({
            data: {
                locationId: locationId,
                userId: body.userId
            }
        });

        return NextResponse.json(bookmark, { status: 201 });
    } catch (error: any) {
        console.log(`[ERROR]: Error in POST of /api/bookmarks/createBookmark/[locationId]/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}