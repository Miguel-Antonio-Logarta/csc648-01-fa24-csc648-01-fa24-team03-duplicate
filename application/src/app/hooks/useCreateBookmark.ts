import { Session } from 'next-auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

/**
 * @Notes - Use this hook in the frontend to create a bookmark. (Client Component)
 * @param {string} locationId - The location id.
 * @param {Session} session - The session object.   
 * @description - A custom hook that creates a bookmark.
 * @returns {Object} - Returns an object containing the createBookmark function and a loading state.
 */
const useCreateBookmark = () => {
    const [loading, setLoading] = useState(false);

    const createBookmark = async (locationId: string, session: Session) => {
        setLoading(true);
        try {
            if(!session) throw new Error('You must be logged in to create a bookmark');
            const res = await fetch(`/api/bookmarks/createBookmark/${locationId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: session.user.id,
                }),
            });
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            toast.success('Bookmark created');
        } catch(err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }

    };

    return { createBookmark, loading };
};

export default useCreateBookmark;