'use client';

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        // must prevent the page reloading on signout or else we can't redirect to home
        const status = await signOut({ redirect: false });
        if(status) {
            toast.success('You have been logged out successfully!');
            router.push('/');
        } else {
            toast.error('An error occurred while logging out. Please try again.');
        }
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