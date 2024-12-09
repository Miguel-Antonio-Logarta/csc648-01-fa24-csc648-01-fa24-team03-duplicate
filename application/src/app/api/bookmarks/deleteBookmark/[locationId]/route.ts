import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";

export const dynamic = 'force-dynamic'

interface BookmarkData {
  userId: string;
}

/**
 * @Auth - Required
 * @Endpoint - DELETE /api/bookmarks/deleteBookmark/{locationId}
 * @description - Deletes a bookmark for a specific location given its id. 
 * @returns - the deleted bookmark.
 */
export async function DELETE(req: NextRequest, { params }: { params: { locationId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body: BookmarkData = await req.json();
    const requiredFields: (keyof BookmarkData)[] = [
      'userId'
    ]

    const missingFields = requiredFields.filter(field => !body[field] === undefined);

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing fields: ${missingFields.join(', ')}` }, { status: 400 });
    }
    const locationId = params.locationId;

    if (!locationId) {
      return NextResponse.json({ error: "No locationId provided." }, { status: 400 });
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
        id: body.userId
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User does not exist." }, { status: 400 });
    }

    if (session?.user.id !== body.userId) {
      return NextResponse.json({ error: "Unauthorized | (Session user id does not match given user id)." }, { status: 401 });
    }

    // find the matching bookmark
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        locationId: locationId,
        userId: body.userId
      }
    });

    if (!existingBookmark) {
      return NextResponse.json({ error: "Bookmark does not exist." }, { status: 400 });
    }

    // delete that bookmark NOW!
    const deletedBookmark = await prisma.bookmark.delete({
      where: {
        id: existingBookmark.id
      }
    });

    return NextResponse.json(deletedBookmark);
  } catch (error: any) {
    console.log(`[ERROR]: Error in DELETE of /api/bookmarks/deleteBookmark/[locationId]/route.ts: ${error}`);
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }

}