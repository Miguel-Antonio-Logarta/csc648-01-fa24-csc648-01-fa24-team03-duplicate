import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../prisma/prisma"
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials) {
                const { username, password } = credentials ?? {};
                if (!username || !password) {
                    throw new Error("Missing credentials");
                }

                const user = await prisma.user.findFirst({ where: { username } });
                if (!user) {
                    throw new Error("User not found");
                }

                const isValidPassword = await bcrypt.compare(password, user.password);
                if (!isValidPassword) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.username = user.username;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.role && session.user) {
                session.user.role = token.role;
                session.user.username = token.username;
                session.user.id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/signin"
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
