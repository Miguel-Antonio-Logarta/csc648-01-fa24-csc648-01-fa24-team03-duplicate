import { useState, useEffect } from 'react';

interface Analytics {
    numOfLocations: number;
    numOfUsers: number;
    numOfReviews: number;
    numOfBookmarks: number;
}

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