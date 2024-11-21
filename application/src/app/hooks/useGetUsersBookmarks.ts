import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';


/**
 * @Notes - Use this hook in the frontend if you want to fetch all bookmarks for a specific user from the backend (MUST BE A CLIENT COMPONENT)
 * @pararms - userId: string
 * @description - Custom hook to fetch all bookmarks for a specific user
 * @returns {usersBookmarks} - Array of bookmarks for a specific user
 */
const useGetUsersBookmarks = () => {
    const [usersBookmarks, setUsersBookmarks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsersBookmarks = async (userId: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/bookmarks/userBookmarks/${userId}`, 
                { cache: 'no-store'}
            );
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            setUsersBookmarks(data);
        } catch(err: any) {
            console.error(err.message);

            // do not render this error message in production
            //toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { usersBookmarks, fetchUsersBookmarks, loading };
};

export default useGetUsersBookmarks;