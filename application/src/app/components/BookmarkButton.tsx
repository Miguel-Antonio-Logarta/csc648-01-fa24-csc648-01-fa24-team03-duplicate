'use client';

import { useSession } from "next-auth/react";
import useCreateBookmark from "../hooks/useCreateBookmark";

interface BookmarkButtonProps {
    locationId: string;
}

const BookmarkButton = ({ locationId }: BookmarkButtonProps) => {
    const { data: session, status } = useSession();
    const { createBookmark, loading } = useCreateBookmark();
    
    const handleClick = async () => {
        if (session) {
            await createBookmark(locationId, session);
        }
    }

    return (
        <button onClick={handleClick} className="flex gap-3.5 px-4 py-4 text-lg tracking-widest text-center bg-sage rounded-[100px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-stone-50">Save</button>
    );
};

export default BookmarkButton;
