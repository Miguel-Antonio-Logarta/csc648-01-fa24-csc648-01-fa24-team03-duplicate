import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import prisma from "../../../../prisma/prisma";

export const dynamic = 'force-dynamic'

// defining the expected data from client
interface UserData {
  username: string;
  email: string;
  password: string;
  role: Role;
}

/**
 * @Endpoint - GET /api/users
 * @description - Get all users in the database
 * @returns - all users in the database
 */
export async function GET() {
  try {
    // we only want to return relevant information about the user (Note: We do not return the password. Bad Idea)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        creationDate: true,
      },
    });

    return NextResponse.json(users);
  } catch (error: any) {
    console.log(`[ERROR]: Error in GET of api/users/route.ts: ${error}`);
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }
}


/**
 * @Endpoint - POST /api/users
 * @param - See Interface UserData
 * @description - Create a new user
 * @returns - the user that was created
 */
export async function POST(req: NextRequest) {
  try {
    // Get all data from the request body using the format we defined in the interface
    const body: UserData = await req.json();
    
    // role is not required. If not provided, default to 'USER'
    const requiredFields: (keyof UserData)[] = [
      'username',
      'email',
      'password'
    ];

    // Check if all required fields are provided
    const missingFields = requiredFields.filter(field => !body[field] === undefined);

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing fields: ${missingFields.join(', ')}` }, { status: 400 });
    }

    // validation check to make sure the username and email are unique and not already in the database
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: body.email }, { username: body.username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "username or email already exists" },
        { status: 400 }
      );
    }

    // hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: await bcrypt.hash(body.password, salt),
      },
    });

    return NextResponse.json(
      {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        creationDate: newUser.creationDate,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(`[ERROR]: Error in POST of api/users/route.ts: ${error}`);
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }
}