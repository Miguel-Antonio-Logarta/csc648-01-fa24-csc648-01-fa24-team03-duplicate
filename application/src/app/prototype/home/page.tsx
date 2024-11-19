'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
    const { data: session, status } = useSession();

    console.log(session);

    const handleLogout = async () => {
        await signOut({ redirect: false });
    }


    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
            {status === "authenticated" ? (
                <>
                    <div className="p-4 rounded-md">
                        <h1 className="text-2xl font-bold">Welcome, {session.user.username}</h1>
                        <p>Your role: {session.user.role}</p>
                        <p>Your User Id is: {session.user.id}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <h1 className="p-4 rounded-md">Not authenticated</h1>
                    <Link href="auth/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</Link>
                </>
            )}
        </div>

    );


}