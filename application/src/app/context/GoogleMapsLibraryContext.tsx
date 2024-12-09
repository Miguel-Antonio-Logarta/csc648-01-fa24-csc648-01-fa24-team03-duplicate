'use client';

import { createContext } from 'react';
import { Libraries, useJsApiLoader } from '@react-google-maps/api';

type GoogleMapsLibraryProps = {
  children: React.ReactNode;
};

type GoogleMapsContextType = {
  isLoaded: boolean;
  loadError: Error | undefined;
};

const libraries: Libraries = ['places'];

export const GoogleMapsLibraryContext = createContext<GoogleMapsContextType>(
  null!
);

const GoogleMapsLibraryProvider = ({ children }: GoogleMapsLibraryProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: libraries,
  });

  const values = {
    isLoaded: isLoaded,
    loadError: loadError,
  };

  return (
    <GoogleMapsLibraryContext.Provider value={values}>
      {children}
    </GoogleMapsLibraryContext.Provider>
  );
};

export default GoogleMapsLibraryProvider;
