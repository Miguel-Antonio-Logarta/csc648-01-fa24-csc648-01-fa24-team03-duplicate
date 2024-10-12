import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

/**
 * @Endpoint - GET /api/reviews
 * @description - Fetches all reviews from the database.
 * @returns - all reviews in the database.
 */
export async function GET() {
    try {
        const reviews = await prisma.review.findMany({
            select: {
                id: true,
                rating: true,
                description: true,
                timestamp: true
            }
        });

        return NextResponse.json(reviews);
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/reviews/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}