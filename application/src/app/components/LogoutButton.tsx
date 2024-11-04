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
            className="bg-[#f75d5d] border-[#f75d5d] border-2 font-josefin px-4 py-2 shadow-md rounded-full hover:bg-white"
        >
            Logout
        </button>
    );

};