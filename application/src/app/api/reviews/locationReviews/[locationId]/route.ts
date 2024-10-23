import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";

export const dynamic = 'force-dynamic'

/**
 * @Endpoint - GET /api/locations/locationReview/{locationId}
 * @description - Fetches all reviews for a specific location given its id. 
 * @returns - all reviews for a specific location given its id.
 */
export async function GET(req: NextRequest, { params } : { params : { locationId : string}}) {
    try {
        const locationId = params.locationId;
    
        if(!locationId) {
            return NextResponse.json({ error: "No locationId provided." }, { status: 400});
        }
    
        // get all reviews and their information for a location and include the name of the user who created the review
        const reviews = await prisma.review.findMany({
            where: {
                locationId: locationId
            },
            select: {
                id: true,
                rating: true,
                content: true,
                creationDate: true,
                user: {
                    select: {
                        username: true
                    }
                }
            }
        });
    
        if(!reviews) {
            return NextResponse.json({ error: "No reviews found." }, { status: 404});
        }
    
        return NextResponse.json(reviews);
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/locations/locationReviews/[locationId]/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    } 
}