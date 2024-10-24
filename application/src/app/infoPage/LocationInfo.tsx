import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { convertTo12HourFormat } from "../utils/utils";
import { DayOfWeek, LocationType } from "@prisma/client";

interface Location {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    hasWifi: boolean;
    seatingCapacity: number;
    category: LocationType;
    rating: number;
    busynessStatus: number;
    imageWebLink: string;
    locationWebsiteLink: string;
    animalFriendliness: boolean;
    operatingHours: OperatingHour[];
}

interface OperatingHour {
    day: DayOfWeek;
    openTime: string;
    closeTime: string;
}

interface Review {
    id: string;
    rating: number;
    content: string;
    creationDate: string;
}

const LocationInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch location data
    const fetchLocation = async () => {
      try {
        const response = await fetch(`/api/locations/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch location');
        }
        const data = await response.json();
        setLocation(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLocation();
  }, [id]);

  if (error) {
    return <div className="text-red-500 p-4 bg-red-100 border border-red-400 rounded-lg">Error: {error}</div>;
  }

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{location.name}</h1>
      <p>{location.description}</p>
      {/* Render other location details */}
    </div>
  );
};

export default LocationInfo;