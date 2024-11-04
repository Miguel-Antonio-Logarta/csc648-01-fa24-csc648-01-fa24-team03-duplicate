"use client"

import { createContext, useState } from "react"
import { LocationData } from "../api/locations/route"

type SearchContextProps = {
    children: React.ReactNode
}

type SearchContextType = {
    locations: LocationData[];
    setLocations: (_: LocationData[]) => void;
}

export const SearchContext = createContext<SearchContextType>(null!);

const SearchProvider = ({ children }: SearchContextProps) => {
    const [locations, setLocations] = useState<LocationData[]>([]);

    const values = {
        locations: locations,
        setLocations: setLocations
    }

    return (
        <SearchContext.Provider value={values}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchProvider