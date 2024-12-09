import { useState, useEffect } from 'react';

/**
 * example: /api/locations/search?name=starbuck&category=CAFE&hasWifi=true
 *  where queryParam = {name=starbuck&category=CAFE&hasWifi=true}
 * @Notes - Use this hook in the frontend
 * @description - Custom hook to fetch locations based on query parameters
 * @param queryParams - Query parameters to be used for filtering locations
 * @returns - Returns an object containing locations, loading state and error state
 */
const useLocationSearch = (queryParams: string) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFilteredLocations = async () => {
            try {
                setLoading(true);
                console.log("[INFO]: Received query params: ", queryParams);
                console.log(`[INFO]: Hitting /api/locations/search?${queryParams}`);
                const response = await fetch(`/api/locations/search?${queryParams}`, { cache: 'no-store' });
                const data = await response.json();
                if(data.error) throw new Error(data.error);
                setLocations(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchFilteredLocations();
    }, [queryParams]);

    return { locations, loading, error };
};

export default useLocationSearch;