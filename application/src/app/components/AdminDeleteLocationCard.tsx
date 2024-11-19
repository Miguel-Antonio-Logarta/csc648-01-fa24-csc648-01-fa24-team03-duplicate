'use client';

interface Location {
    id: string;
    name: string;
    address: string;
}

interface AdminDeleteLocationCardProps {
    location: Location;
    onDelete: (id: string) => void;
}

const AdminDeleteLocationCard = ({ location, onDelete }: AdminDeleteLocationCardProps) => {
    return (
        <div className="space-y-2 p-4 shadow-md rounded-lg w-full" style={{ background: 'linear-gradient(to right, #FCE0D3, #E89CA8)' }}>
            <p className="text-gray-700"><span className="font-bold">Location Name: </span>{location.name}</p>
            <p className="text-gray-700"><span className="font-bold">Location Address: </span>{location.address}</p>
            <button
                onClick={() => onDelete(location.id)}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                    Delete Location
                </button>
        </div>
    );
};

export default AdminDeleteLocationCard;