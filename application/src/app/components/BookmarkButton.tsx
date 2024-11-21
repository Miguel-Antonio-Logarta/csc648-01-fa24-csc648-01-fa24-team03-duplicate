'use client';

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import useCreateBookmark from "../hooks/useCreateBookmark";
import { useRouter } from "next/navigation";
import useGetUsersBookmarks from "../hooks/useGetUsersBookmarks";
import useDeleteBookmark from "../hooks/useDeleteBookmark";

interface BookmarkButtonProps {
    locationId: string;
}

interface Bookmark {
    id: string;
    location: {
        id: string;
    }
}

const BookmarkButton = ({ locationId }: BookmarkButtonProps) => {
    const { data: session, status } = useSession();
    const { createBookmark, loading: createLoading } = useCreateBookmark();
    const { deleteBookmark, loading: deleteLoading } = useDeleteBookmark();
    const router = useRouter();
    const { usersBookmarks, fetchUsersBookmarks } = useGetUsersBookmarks();

    // fetch all the user's bookmarks
    useEffect(() => {
        if (session) {
            fetchUsersBookmarks(session.user.id);
        }

        // DO NOT INCLUDE fetchUsersBookmarks IN DEPENDENCIES | It will cause infinite loop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    
    const handleCreateBookmark = async () => {
        if (session) {
            await createBookmark(locationId, session);
        }
    }
    
    const handleDeleteBookmark = async () => {
        if(session) {
            await deleteBookmark(locationId, session);
        }
    }
    
    const handleLoginRedirect = () => {
        router.push('/login');
    }
    
    // search through all the user's bookmarks to see if the location is already bookmarked
    // ideally I would create a hook to not return a list of all user's bookmarks and instead
    // pass the locationId + the session userId to the backend to check if the location is bookmarked
    if (usersBookmarks.some((bookmark: Bookmark) => bookmark.location.id === locationId)) {
        return (
            <div>
                <button onClick={handleDeleteBookmark} className="flex gap-3.5 px-4 py-4 text-lg tracking-widest text-center bg-red-500 rounded-[100px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-stone-50">
                    Unbookmark
                </button>
            </div>
        );
    }
    
    return (
        <div>
            {session ? (
                <button
                    onClick={handleCreateBookmark}
                    className="flex gap-3.5 px-4 py-4 text-lg tracking-widest text-center bg-sage rounded-[100px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-stone-50"
                >
                    Bookmark
                </button>
            ) : (
                <button onClick={handleLoginRedirect} className="flex gap-3.5 px-4 py-4 text-lg tracking-widest text-center bg-sage rounded-[100px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-stone-50">
                    Login to Bookmark
                </button>
            )}
        </div>
    );
};

export default BookmarkButton;
