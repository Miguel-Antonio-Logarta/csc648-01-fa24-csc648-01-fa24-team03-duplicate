'use client';

import { createContext, useState } from 'react';

type SearchContextProps = {
  children: React.ReactNode;
};

type SearchContextType = {
  search: string;
  setSearch: (_: string) => void;
  geolocation: google.maps.LatLng | undefined;
  setGeolocation: (_: google.maps.LatLng | undefined) => void;
  filters: unknown;
  setFilters: (_: unknown) => void;
};

export const SearchContext = createContext<SearchContextType>(null!);

const SearchProvider = ({ children }: SearchContextProps) => {
  const [search, setSearch] = useState<string>('');
  const [geolocation, setGeolocation] = useState<
    google.maps.LatLng | undefined
  >(undefined);

  // Once filters is implemented, we will create a type for this
  const [filters, setFilters] = useState<unknown>(undefined);

  const values = {
    search: search,
    setSearch: setSearch,
    geolocation: geolocation,
    setGeolocation: setGeolocation,
    filters: filters,
    setFilters: setFilters,
  };

  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};

export default SearchProvider;
