import { Session } from 'next-auth';
import { useState } from 'react';
import toast from 'react-hot-toast';

/**
 * @Auth - Required (User)
 * @Notes - Use this hook in the frontend to delete a bookmark.
 * @params - locationId - The id of the location to delete.
 * @description - This hook is used to delete a bookmark from the database.
 * @returns - Returns a function to delete a bookmark and a loading state.
 */
const useDeleteBookmark = () => {
    const [loading, setLoading] = useState(false);

    const deleteBookmark = async (locationId: string, session: Session) => {
        setLoading(true);
        try {
            if(!session) throw new Error('Unauthorized');
            const res = await fetch(`/api/bookmarks/deleteBookmark/${locationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: session.user.id })
            })
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            toast.success('Bookmark deleted successfully!');

            // not a fan of this, could use react magic to update the UI
            window.location.reload();
        } catch(err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { deleteBookmark, loading };
}

export default useDeleteBookmark;