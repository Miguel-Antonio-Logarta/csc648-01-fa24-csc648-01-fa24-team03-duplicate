'use client';
import { useState } from "react";
import { useSession } from 'next-auth/react';
import Unauthorized from '../../components/Unauthorized';
import useLocationSearch from '../../hooks/useLocationSearch';
import AdminSearchbar from '../../components/AdminSearchbar';
import { useRouter } from 'next/navigation';


interface Location {
  id: string;
  name: string;
  address: string;
  category: string; // Add this line
}

const Page = () => {
  const { data: session, status } = useSession();
  const [query, setQuery] = useState('name=');
  const { locations, loading, error } = useLocationSearch(query);
  const router = useRouter();

  // show nothing if loading for now
  if (status === 'loading') return;

  // show Unauthorized if not authenticated or not an admin
  if (status === 'unauthenticated' || session?.user.role !== 'ADMIN') {
    return <Unauthorized />;
  }

  const handleSearch = (query: string) => {
    setQuery(`name=${query}`);
  }

  const handleOnClick = (locationId: string) => {
    // redirect to edit location page
    router.push(`/admin/editLocation/${locationId}`);
  }

  return (
    <div className="p-8 flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(to right, #FCE0D3, #E89CA8)' }}>
      <div className="space-y-6 p-8 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800">Edit Location</h2>
        <div className="flex justify-center">
          <AdminSearchbar onSearch={handleSearch} />
        </div>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="flex flex-col items-center mt-4 space-y-4">
          {locations.map((location: Location) => (
            <div
              key={location.id}
              onClick={() => handleOnClick(location.id)}
              className={`z-10 flex flex-col shadow-md rounded-lg border-4 p-6 cursor-pointer bg-sage w-full`}
            >
              <div className="flex flex-col">
                <div className="font-shantell text-xl mb-2">{location.name}</div>
                <div className="font-josefin text-sm text-stone-600">{location.address}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;