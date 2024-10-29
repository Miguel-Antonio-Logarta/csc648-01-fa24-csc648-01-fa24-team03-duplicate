import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export const dynamic = 'force-dynamic'

export async function GET() {
    const session = await getServerSession(authOptions);

    // check if user is logged in and is admin
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    try {
        const numOfLocations = await prisma.location.count();
        const numOfUsers = await prisma.user.count();
        const numOfReviews = await prisma.review.count();
        const numOfBookmarks = await prisma.bookmark.count();


        return NextResponse.json({
            numOfLocations: numOfLocations,
            numOfUsers: numOfUsers,
            numOfReviews: numOfReviews,
            numOfBookmarks: numOfBookmarks
        });
    } catch (error: any) {
        console.log(`[ERROR]: Error in POST of api/analytics/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }


}