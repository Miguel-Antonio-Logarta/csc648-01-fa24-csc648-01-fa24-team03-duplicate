'use client';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import stars from '../about/timmytram/images/stars.png';


const Page = () => {

    const { data: session, status } = useSession();

    if (status === 'unauthenticated' || session?.user.role !== 'ADMIN') {
        return <div>Unauthorized</div>
    }

    return (
        <div className="flex items-center justify-center min-h-screen text-black">
            <div className="relative bg-white p-8 rounded-lg shadow-lg text-center max-w-md overflow-hidden">

                

                {/* Content */}
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold mb-4">Welcome Admin: {session?.user.username}</h1>
                    <Link href="/admin/createLocation" className="block text-blue-300 hover:underline mt-2">
                        Create Locations Form
                    </Link>
                    <Link href="/admin/editLocation" className="block text-blue-300 hover:underline mt-2">
                        Edit Location Form
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Page;