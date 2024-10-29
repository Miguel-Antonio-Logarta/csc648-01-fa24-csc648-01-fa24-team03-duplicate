import { useState, useEffect } from 'react';


/**
 * @Notes - Use this hook in the frontend if you want to fetch all locations from the backend (MUST BE A CLIENT COMPONENT)
 * @param {void} - No parameters
 * @description - Custom hook to fetch all locations from the backend
 * @returns {Object} - Returns an object containing the locations, loading state and error state
 * 
 * the locations is an array of all locations in our db.
 * 
 */
const useGetLocationData = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/locations', { cache: 'no-store' });
                const data = await response.json();
                if(data.error) throw new Error(data.error);
                setLocations(data);
            } catch (error: any) {
                // could use react toast here.
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    return { locations, loading, error };
};

export default useGetLocationData;