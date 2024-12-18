import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";

export const dynamic = 'force-dynamic'

// defining the expected data for a review
interface ReviewData {
    rating: number;
    busynessStatus: number;
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
            'busynessStatus',
            'content',
            //'userId'
        ]

        const missingFields = requiredFields.filter(field => !body[field] === undefined);

        if (missingFields.length > 0) {
            return NextResponse.json({ error: `Missing fields: ${missingFields.join(', ')}` }, { status: 400 });
        }

        const location = await prisma.location.findFirst({
            where: {
                id: locationId
            }
        });

        if (!location) {
            return NextResponse.json({ error: "Location does not exist." }, { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                //id: body.userId
                id: session.user.id
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User does not exist." }, { status: 400 });
        }

        // actually create the review
        const review = await prisma.review.create({
            data: {
                rating: body.rating,
                busynessStatus: body.busynessStatus,
                content: body.content,
                locationId: locationId,
                //userId: body.userId
                userId: session.user.id
            }
        });

        // get all the reviews for the location
        const allReviews = await prisma.review.findMany({
            where: {
                locationId: locationId
            }
        });

        // Calculate the average rating for the location
        // round to nearest 2 decimal places
        const avgRating = Math.round(
            (allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length) * 100
        ) / 100;

        // Calculate the average busyness status for the location
        // round to nearest 2 decimal places
        const avgBusynessStatus = Math.round(
            (allReviews.reduce((sum, review) => sum + review.busynessStatus, 0) / allReviews.length) * 100
        ) / 100;

        // update the location's rating
        await prisma.location.update({
            where: {
                id: locationId
            },
            data: {
                rating: avgRating,
                busynessStatus: avgBusynessStatus,
            }
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error: any) {
        console.log(`[ERROR]: Error in POST of api/reviews/createReview/[locationId]/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}