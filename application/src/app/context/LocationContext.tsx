'use client';

import { createContext, useState } from 'react';
import { LocationData } from '../api/locations/route';

type LocationContextProviderProps = {
  children: React.ReactNode;
};

type LocationContextType = {
  selectedLocationId: number | undefined;
  setSelectedLocationId: (_: number | undefined) => void;
  locationRefs: number[] | undefined;
  setLocationRefs: (_: number[] | undefined) => void;
  locations: LocationData[];
  setLocations: (_: LocationData[]) => void;
  selectedLocation: LocationData | undefined;
  setSelectedLocation: (_: LocationData) => void;
};

export const LocationContext = createContext<LocationContextType>(null!);

const LocationProvider = ({ children }: LocationContextProviderProps) => {
  const [selectedLocationId, setSelectedLocationId] = useState<
    number | undefined
  >(undefined);
  const [locationRefs, setLocationRefs] = useState<number[] | undefined>(
    undefined
  );

  const [locations, setLocations] = useState<LocationData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<
    LocationData | undefined
  >(undefined);

  const values = {
    selectedLocationId: selectedLocationId,
    setSelectedLocationId: setSelectedLocationId,
    locationRefs: locationRefs,
    setLocationRefs: setLocationRefs,
    locations: locations,
    setLocations: setLocations,
    selectedLocation: selectedLocation,
    setSelectedLocation: setSelectedLocation,
  };

  return (
    <LocationContext.Provider value={values}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
