import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";

// defining the expected data for a review
interface ReviewData {
    rating: number;
    description: string;
    userId: string;
}

/**
 * @Endpoint - POST /api/reviews/createReview/{locationId}
 * @description - Creates a review for a specific location.
 * @returns - the created review.
 */
export async function POST(req: NextRequest, { params }: { params: { locationId: string } }) {
    try {
        const body: ReviewData = await req.json();
        const locationId = params.locationId;

        const requiredFields: (keyof ReviewData)[] = [
            'rating',
            'description',
            'userId'
        ]

        const missingFields = requiredFields.filter(field => !body[field] === undefined);

        if(missingFields.length > 0) {
            return NextResponse.json({ error: `Missing fields: ${missingFields.join(', ')}` }, { status: 400 });
        }

        const location = await prisma.location.findFirst({
            where: {
                id: locationId
            }
        });

        if(!location) {
            return NextResponse.json({ error: "Location does not exist." }, { status: 400 });
        }

        // realistcally this would not be needed to be included, but i dont have auth setup yet
        const user = await prisma.user.findFirst({
            where: {
                id: body.userId
            }
        });

        if(!user) {
            return NextResponse.json({ error: "User does not exist." }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                rating: body.rating,
                description: body.description,
                locationId: locationId,
                userId: body.userId
            }
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error: any) {
        console.log(`[ERROR]: Error in POST of api/reviews/createReview/[locationId]/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}