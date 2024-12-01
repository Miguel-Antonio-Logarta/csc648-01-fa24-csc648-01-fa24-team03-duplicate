import { useState } from 'react';

/**
 * @Notes - Use this hook in the frontend if you want to fetch a specific location from the backend (MUST BE A CLIENT COMPONENT)
 * @params - locationId: string
 * @description - Custom hook to fetch a specific location
 * @returns {specificLocation} - Object of a specific location
 */
const useGetSpecificLocation = () => {
    const [specificLocation, setSpecificLocation] = useState();
    const [loading, setLoading] = useState(false);

    const fetchSpecificLocation = async (locationId: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/locations/${locationId}`);
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            setSpecificLocation(data);
        } catch (err: any) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
        
    };

    return { specificLocation, fetchSpecificLocation, loading };
};

export default useGetSpecificLocation;