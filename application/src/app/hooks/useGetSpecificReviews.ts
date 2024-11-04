import { useState } from 'react';

/**
 * @Notes - Use this hook in the frontend if you want to fetch all reviews for a specific location from the backend (MUST BE A CLIENT COMPONENT)
 * @params - locationId: string
 * @description - Custom hook to fetch all reviews for a specific location
 * @returns {specificReviews} - Array of reviews for a specific location
 */
const useGetSpecificReviews = () => {
    const [specificReviews, setSpecificReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSpecificReviews = async (locationId: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/reviews/locationReviews/${locationId}`);
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            setSpecificReviews(data);
        } catch (err: any) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { specificReviews, fetchSpecificReviews, loading };
};

export default useGetSpecificReviews;