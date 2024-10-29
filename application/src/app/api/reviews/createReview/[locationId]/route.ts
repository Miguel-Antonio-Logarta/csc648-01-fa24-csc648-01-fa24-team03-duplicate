import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";

export const dynamic = 'force-dynamic'

// defining the expected data for a review
interface ReviewData {
    rating: number;
    content: string;
    userId: string;
}

/**
 * @Auth - Required
 * @Endpoint - POST /api/reviews/createReview/{locationId}
 * @description - Creates a review for a specific location.
 * @returns - the created review.
 */
export async function POST(req: NextRequest, { params }: { params: { locationId: string } }) {
    
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    try {
        const body: ReviewData = await req.json();
        const locationId = params.locationId;

        const requiredFields: (keyof ReviewData)[] = [
            'rating',
            'content',
            //'userId'
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

        const user = await prisma.user.findFirst({
            where: {
                //id: body.userId
                id: session.user.id
            }
        });

        if(!user) {
            return NextResponse.json({ error: "User does not exist." }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                rating: body.rating,
                content: body.content,
                locationId: locationId,
                //userId: body.userId
                userId: session.user.id
            }
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error: any) {
        console.log(`[ERROR]: Error in POST of api/reviews/createReview/[locationId]/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}