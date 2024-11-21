'use client';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

interface Bookmark {
    id: string;
    location: {
        id: string;
        name: string;
        category: string;
        imageWebLink: string;
    };
    creationDate: string;
}

interface BookmarkCardProps {
    bookmark: Bookmark;
}

const BookmarkCard = ({ bookmark }: BookmarkCardProps) => {

    const backgroundColor = clsx({
        'bg-olivine hover:bg-olivine': bookmark.location.category === 'CAFE',
        'bg-cherry-blossom-pink': bookmark.location.category === 'LIBRARY',
        'bg-gray': bookmark.location.category === 'PARK',
    });

    const hoverColor = clsx({
        'bg-tea-green-hover hover:bg-olivine': bookmark.location.category === 'CAFE',
        'bg-pink-hover hover:bg-cherry-blossom-pink': bookmark.location.category === 'LIBRARY',
        'bg-slate-200 hover:bg-gray': bookmark.location.category === 'PARK',
    });

    const borderColors = clsx({
        "border-olivine": bookmark.location.category === "CAFE",
        "border-cherry-blossom-pink": bookmark.location.category === "LIBRARY",
        "border-black": bookmark.location.category === "PARK"
    });

    const handleClick = () => {
        // open location in new tab
        window.open(`/locationInfo/${bookmark.location.id}`, '_blank');
    }

    return (
        <div onClick={handleClick} className={`flex flex-col shadow-md rounded-lg border-4 p-6 cursor-pointer ${backgroundColor} ${hoverColor} ${borderColors}`}>
            <div className="flex flex-row gap-6">
                <div className="flex items-center">
                    <div className="relative w-[150px] h-[150px] self-start">
                    <Image
                        className="object-cover rounded-lg bg-slate"
                        alt={bookmark.location.name}
                        fill={true}
                        src={bookmark.location.imageWebLink}
                    />
                    </div>
                </div>
                <div className="flex flex-col grow">

                    <div className="font-shantell text-xl mb-2">{bookmark.location.name}</div>
                    <div className="font-josefin text-sm mb-3">
                        Bookmarked on: {new Date(bookmark.creationDate).toDateString()}
                    </div>
                    <div className="font-josefin text-sm mb-3">
                        {bookmark.location.category}
                    </div>

                    {/* <div className="flex justify-start mt-auto">
                        <Link
                            href={`/locationInfo/${bookmark.location.id}`}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            View Location
                        </Link>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default BookmarkCard;