import { useState, useEffect } from 'react';


/**
 * @Notes - Use this hook in the frontend if you want to fetch all users from the backend (MUST BE A CLIENT COMPONENT)
 * @param {void} - No parameters
 * @description - Custom hook to fetch all users from the backend
 * @returns {Object} - Returns an object containing the users, loading state and error state
 * 
 * the users is an array of all users in our db.
 * 
 */
const useGetUserData = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/users', { cache: 'no-store' });
                const data = await response.json();
                if(data.error) throw new Error(data.error);
                setUsers(data);
            } catch (error: any) {

                // could use react toast here.
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
};

export default useGetUserData;