import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../../prisma/prisma";

/**
 * @Endpoint - PATCH /api/users/{userId}
 * @description - Edit a user's data (email, password)
 * @returns - the user that was edited.
 */
export async function PATCH(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const { email, password } = await req.json();
        const userId = params.userId;

        if (!userId) {
            return NextResponse.json({ error: "No userId provided." }, { status: 400 });
        }

        if (!email && !password) {
            return NextResponse.json({ error: "No email or password provided." }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        const updateData: any = {};

        if (email) {
            const existingEmail = await prisma.user.findFirst({
                where: { email },
            });

            if (existingEmail && existingEmail.id !== userId) {
                return NextResponse.json({ error: "Email already taken by another user." }, { status: 400 });
            }

            updateData.email = email;
        }


        if (password) {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            updateData.password = hashedPassword;
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: updateData
        });

        return NextResponse.json({
            "message": "User updated successfully.",
            updatedUser: {
                id: updatedUser.id,
                email: updatedUser.email,
                username: updatedUser.username,
            },
        },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(`[ERROR]: Error in PATCH of api/users/[userId]/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}

/**
 * @Endpoint - GET /api/users/{userId} 
 * @description - Get a specific user by their userId
 * @returns - the specific user and their data
 */
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const userId = params.userId;

        if (!userId) {
            return NextResponse.json({ error: "No userId provided." }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        return NextResponse.json({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            creationDate: user.creationDate,
        });
    } catch (error: any) {
        console.log(`[ERROR]: Error in GET of api/users/[userId]/route.ts: ${error}`);
        return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
    }
}