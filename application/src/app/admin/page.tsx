'use client';
import { useSession } from "next-auth/react";
import Unauthorized from "../components/Unauthorized";
import useGetAnalytics from "../hooks/useGetAnalytics";



const Page = () => {
    const { data: session, status } = useSession();
    const { analytics, loading, error } = useGetAnalytics();

    // show nothing if loading for now
    if (status === 'loading') return;

    // show Unauthorized if not authenticated or not an admin
    if (status === 'unauthenticated' || session?.user.role !== 'ADMIN') {
        return <Unauthorized />;
    }

    // show the page if authenticated and an admin
    return (
        <div className="p-8 bg-gray-100 min-h-[calc(100vh-5rem)] bg-gradient-to-r from-purple-500 to-pink-500">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Welcome Admin: {session?.user.username}</h1>
                <h1 className="text-2xl font-semibold mb-6">Coffee Spot Analytics:</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-center text-lg font-medium">Number of Locations</h3>
                    <p className="text-2xl font-bold text-center">{analytics?.numOfLocations ?? 'Loading...'}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-center text-lg font-medium">Number of Users</h3>
                    <p className="text-2xl font-bold text-center">{analytics?.numOfUsers ?? 'Loading...'}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-center text-lg font-medium">Number of Reviews</h3>
                    <p className="text-2xl font-bold text-center">{analytics?.numOfReviews ?? 'Loading...'}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-center text-lg font-medium">Number of Bookmarks</h3>
                    <p className="text-2xl font-bold text-center">{analytics?.numOfBookmarks ?? 'Loading...'}</p>
                </div>
            </div>
        </div>
    );
};

export default Page;