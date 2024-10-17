import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

/**
 * @Endpoint - GET /api/bookmarks
 * @description - Fetches all bookmarks from the database.
 * @returns - all bookmarks in the database.
 */
export async function GET() {
    try {
        const bookmarks = await prisma.bookmark.findMany({
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
            return NextResponse.json({ error: 'No bookmarks found.' }, { status: 200 });
        }

        return NextResponse.json(bookmarks);
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/bookmarks/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}