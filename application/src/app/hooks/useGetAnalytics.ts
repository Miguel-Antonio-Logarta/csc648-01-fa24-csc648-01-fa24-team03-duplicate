import { useState, useEffect } from 'react';

interface Analytics {
    numOfLocations: number;
    numOfUsers: number;
    numOfReviews: number;
    numOfBookmarks: number;
}

/**
 * @Notes - Use this hook in the frontend to get analytics data.
 * @description - This hook is used to get analytics data from the database.
 * @returns - Returns the analytics data, a loading state, and an error state.
 */
const useGetAnalytics = () => {
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const response = await fetch('api/analytics', { cache: 'no-store'});
                const data = await response.json();
                if(data.error) throw new Error(data.error);
                setAnalytics(data);
            } catch (err : any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    return { analytics, loading, error };
};

export default useGetAnalytics;