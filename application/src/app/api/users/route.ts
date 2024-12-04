import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import prisma from "../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

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
      'password'
    ];

    // Check if all required fields are provided
const missingFields = requiredFields.filter(field => body[field] == null);

if (missingFields.length > 0) {
  return NextResponse.json({ error: `Missing fields: ${missingFields.join(', ')}` }, { status: 400 });
}

    const conditions: { username?: string; email?: string }[] = [{ username: body.username }];

    // only check for email if it is provided, email is technically optional
    if (body.email && body.email.trim() !== '') {
      conditions.push({ email: body.email })
    }

    // validation check to make sure the username and email are unique and not already in the database
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: conditions,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "username or email already exists" },
        { status: 400 }
      );
    }

    if (body.password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 });
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

    // create user settings for this user
    await prisma.userSettings.create({
      data: { id: newUser.id }
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

/**
 * @Auth - Required
 * @Endpoint - PATCH /api/users/
 * @description - Edit a user's data (email, password, settings)
 * @returns - the user that was edited.
 */
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // check if user is logged in
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {

    const { email, password, settings } = await req.json();
    const userId = session.user.id;

    console.log(`[INFO]: Email: ${email}, Password: ${password}, Settings: ${settings}`);

    if (!email && !password && !settings) {
      return NextResponse.json({ error: "No email or password or settings provided." }, { status: 400 });
    }

    // check if user exists
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User does not exist." }, { status: 400 });
    }

    const updateData: any = {};

    // if they provided a request to change emails
    if (email && email.length !== 0) {
      // check if email is already taken
      const existingEmail = await prisma.user.findFirst({
        where: { email },
      });

      if (existingEmail && existingEmail.id !== userId) {
        return NextResponse.json({ error: "Email already taken by another user." }, { status: 400 });
      }

      // otherwise we can update the email
      updateData.email = email;
    }

    // if they provided a request to change passwords
    // password cannot be blank and must be at least 6 characters long
    if (password) {
      if (password.length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters long." },
          { status: 400 });
      }

      // hash the password before storing it in the database
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      updateData.password = hashedPassword;
    }

    let updatedSettings = {};

    // if updating their notifications or darkmode settings
    if (settings) {
      updatedSettings = await prisma.userSettings.update({
        where: {
          id: userId
        },
        data: settings
      });
    }

    // finally update the user's email and password
    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: updateData
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(`[ERROR]: Error in PATCH of api/users/route.ts: ${error}`);
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }
}