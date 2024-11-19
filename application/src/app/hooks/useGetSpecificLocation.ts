import { useState } from 'react';


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