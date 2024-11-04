"use client"

import { createContext, useState } from "react"
import { LocationData } from "../api/locations/route"

type SearchContextProps = {
    children: React.ReactNode
}

type SearchContextType = {
    locations: LocationData[];
    setLocations: (_: LocationData[]) => void;
    setSelectedLocation: (_: LocationData) => void;
    selectedLocation: LocationData | null;
}

export const SearchContext = createContext<SearchContextType>(null!);

const SearchProvider = ({ children }: SearchContextProps) => {
    const [locations, setLocations] = useState<LocationData[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

    const values = {
        locations: locations,
        setLocations: setLocations,
        selectedLocation: selectedLocation,
        setSelectedLocation: setSelectedLocation
    }

    return (
        <SearchContext.Provider value={values}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchProvider