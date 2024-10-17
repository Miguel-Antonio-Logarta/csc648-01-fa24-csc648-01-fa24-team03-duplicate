import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";

/**
 * @Endpoint - GET /api/bookmarks/userBookmarks/{userId}
 * @description - Fetches all bookmarks for a specific user given their id. 
 * @returns - all bookmarks for a specific user given their id.
 */
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const userId = params.userId;

        const bookmarks = await prisma.bookmark.findMany({
            where: {
                userId: userId
            },
            select: {
                id: true,
                location: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                creationDate: true
            }
        });

        if (!bookmarks || bookmarks.length === 0) {
            return NextResponse.json({ error: 'No bookmarks found for this user.' }, { status: 200 });
        }

        return NextResponse.json(bookmarks);
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/bookmarks/userBookmarks/[userId]/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}

/**
 * @Endpoint - POST /api/bookmarks/userBookmarks/{userId}
 * @description - Creates a new bookmark for a specific user given their id. 
 * @returns - the newly created bookmark.
 */
export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const body = await req.json();
        const { locationId } = body;

        if (!locationId) {
            return NextResponse.json({ error: "No locationId provided." }, { status: 400 });
        }

        const location = await prisma.location.findUnique({
            where: { id: locationId }
        });

        if (!location) {
            return NextResponse.json({ error: "Location not found." }, { status: 404 });
        }

        const bookmark = await prisma.bookmark.create({
            data: {
                locationId,
                userId: params.userId
            }
        });

        return NextResponse.json(bookmark, { status: 201 });
    } catch (error: any) {
        console.log(`[ERROR]: Error in POST of api/bookmarks/userBookmarks/[userId]/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}