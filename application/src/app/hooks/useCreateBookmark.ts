import { Session } from 'next-auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

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