import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export const dynamic = 'force-dynamic'

/**
 * @Endpoint - GET /api/users/{userid}
 * @description - Get a specific user in the database
 * @returns - the user with the specified id
 */
export async function GET(req: NextRequest, { params }: { params: { userid: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.userid
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        creationDate: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch(error: any) {
    console.log(`[ERROR]: Error in GET of api/users/[userid]/route.ts: ${error}`);
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }
}