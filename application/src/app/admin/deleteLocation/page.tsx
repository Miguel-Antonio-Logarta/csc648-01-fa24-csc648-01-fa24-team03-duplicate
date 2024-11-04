'use client';
import { useState } from "react";
import { useSession } from 'next-auth/react';
import Unauthorized from '../../components/Unauthorized';
import toast from 'react-hot-toast';
import useLocationSearch from '../../hooks/useLocationSearch';
import useDeleteLocation from '../../hooks/useDeleteLocation';
import AdminSearchbar from '../../components/AdminSearchbar';
import AdminDeleteLocationCard from "../../components/AdminDeleteLocationCard";

interface Location {
    id: string;
    name: string;
    address: string;
}

const Page = () => {
    const { data: session, status } = useSession();
    const [query, setQuery] = useState('name=');
    const { locations, loading, error } = useLocationSearch(query);
    const { deleteLocation } = useDeleteLocation();


    // show nothing if loading for now
    if (status === 'loading') return;

    // show Unauthorized if not authenticated or not an admin
    if (status === 'unauthenticated' || session?.user.role !== 'ADMIN') {
        return <Unauthorized />;
    }

    const handleSearch = (query: string) => {
        setQuery(`name=${query}`);
    }

    return (
        <div className="p-8 flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(to right, #FCE0D3, #E89CA8)' }}>
            <div className="space-y-6 p-8 bg-white shadow-lg rounded-lg max-w-lg w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800">Delete Location</h2>
                <div className="flex justify-center">
                    <AdminSearchbar onSearch={handleSearch} />
                </div>
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                <div className="flex flex-col items-center mt-4 space-y-4">
                    {locations.map((location: Location) => (
                        <div key={location.id}>
                            <AdminDeleteLocationCard location={location} onDelete={(id: string) => deleteLocation(id, session)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;