'use client';

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        // must prevent the page reloading on signout or else we can't redirect to home
        await signOut({ redirect: false });
        router.push('/');
    };

    // there is no session, do not show the button
    if (!session) return null;

    return (
        <button onClick={handleLogout}
            className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
        >
            Logout
        </button>
    );

};