'use client';
import Link from 'next/link';
import clsx from 'clsx';

interface Bookmark {
    id: string;
    location: {
        id: string;
        name: string;
        category: string;
    };
    creationDate: string;
}

interface BookmarkCardProps {
    bookmark: Bookmark;
}

const BookmarkCard = ({ bookmark }: BookmarkCardProps) => {
    
    const backgroundColor = clsx({
        'bg-olivine': bookmark.location.category === 'CAFE',
        'bg-cherry-blossom-pink': bookmark.location.category === 'LIBRARY',
        'bg-gray': bookmark.location.category === 'PARK',
    });

    return (
        <div className={`flex flex-col shadow-md rounded-lg border-4 p-6 ${backgroundColor}`}>
            <div className="flex flex-row gap-6">
                <div className="flex flex-col grow">
                    <div className="font-shantell text-xl mb-2">{bookmark.location.name}</div>
                    <div className="font-josefin text-sm mb-3">
                        Bookmarked on: {new Date(bookmark.creationDate).toDateString()}
                    </div>
                    <div className="font-josefin text-sm mb-3">
                        {bookmark.location.category}
                    </div>

                    <div className="flex justify-start mt-auto">
                        <Link
                            href={`/locationInfo/${bookmark.location.id}`}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            View Location
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookmarkCard;