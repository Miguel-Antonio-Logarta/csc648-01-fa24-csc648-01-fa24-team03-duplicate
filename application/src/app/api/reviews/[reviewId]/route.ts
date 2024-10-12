import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

/**
 * @Endpoint - GET /api/reviews/{reviewId}
 * @description - Fetches a single review from the database given a review id. 
 * @returns - a single review from the database.
 */
export async function GET(req: NextRequest, { params }: { params: { reviewId: string } }) {
    try {
        const reviewId = params.reviewId;

        if(!reviewId) {
            return NextResponse.json({ error: "No reviewId provided." }, { status: 400});
        }

        const review = await prisma.review.findUnique({
            where: {
                id: reviewId
            }
        });

        if(!review) {
            return NextResponse.json({ error: "Review not found." }, { status: 404});
        }

        return NextResponse.json(review);
    } catch (error : any) {
        console.log(`[ERROR]: Error in GET of api/reviews/[reviewId]/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}