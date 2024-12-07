import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";

export const dynamic = 'force-dynamic'

/**
 * @Endpoint - GET /api/reviews/userReviews/{userId}
 * @description - Fetches all reviews for a specific user given their id.
 * @returns - all reviews for a specific user given their id.
 */
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const userId = params.userId;

        if (!userId) {
            return NextResponse.json({ error: "No userId provided." }, { status: 400 });
        }

        // get all reviews for a specific user given their id and include the name of the location in the json
        const reviews = await prisma.review.findMany({
            where: {
                userId: userId
            },
            select: {
                id: true,
                rating: true,
                content: true,
                busynessStatus: true,
                creationDate: true,
                location: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!reviews || reviews.length === 0) {
            return NextResponse.json({ error: 'No reviews found.' }, { status: 200 });
        }

        return NextResponse.json(reviews);
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/reviews/userReviews/[userId]/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}