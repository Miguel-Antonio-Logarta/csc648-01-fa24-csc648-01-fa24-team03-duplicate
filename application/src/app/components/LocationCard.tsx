import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import Rating from './Rating';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface LocationCardProps {
  id: string;
  name: string;
  rating: number;
  imageUrl: string;
  category: string;
  hasWifi: boolean;
  animalFriendliness: boolean;
}

const LocationCard: React.FC<LocationCardProps> = ({
  id,
  name,
  rating,
  imageUrl,
  category,
  hasWifi,
  animalFriendliness,
}) => {
  const router = useRouter();

  const backgroundColor = clsx({
    'bg-olivine hover:bg-olivine': category === 'CAFE',
    'bg-cherry-blossom-pink': category === 'LIBRARY',
    'bg-gray': category === 'PARK',
  });

  const hoverColor = clsx({
    'bg-tea-green-hover hover:bg-olivine': category === 'CAFE',
    'bg-pink-hover hover:bg-cherry-blossom-pink': category === 'LIBRARY',
    'bg-slate-200 hover:bg-gray': category === 'PARK',
  });

  const borderColors = clsx({
    "border-olivine": category === "CAFE",
    "border-cherry-blossom-pink": category === "LIBRARY",
    "border-black": category === "PARK"
  });


  const handleClick = () => {
    // open clicked location in new tab
    //window.open(`/locationInfo/${id}`, '_blank');

    // if want to redirect to locationInfo page
    router.push(`/locationInfo/${id}`);
  }

  return (
    <div
      onClick={handleClick}
      className={`z-10 flex flex-col shadow-md rounded-lg border-4 p-6 cursor-pointer ${backgroundColor} ${hoverColor} ${borderColors}`}
    >
      <div className="flex flex-row gap-6">
        {/* Image Section */}
        <Image
          className="w-32 h-32 object-cover rounded-lg bg-slate"
          alt={name}
          src={imageUrl}
          width={256}
          height={256}
        />

        {/* Text and Rating Section */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="font-shantell text-xl mb-2 truncate">
            {name}
          </div>
          <div className="font-shantell text-sm break-words">
            {category}
          </div>
          <div className="mt-2">
            <Rating rating={rating} size={32} style="full" />
          </div>

          {/* Icons Section */}
          <ul className="flex flex-row gap-2 mt-4 pl-[10px]">
            <li>
              {hasWifi && (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      d="M6.01129 12.1871C9.31912 8.97669 14.6822 8.97669 17.99 12.1871M9.00596 15.0935C10.6599 13.4883 13.3414 13.4883 14.9953 15.0935M12.0006 18L12.0182 17.983M3 9.61811C7.97056 4.79396 16.0294 4.79396 21 9.61811"
                      stroke="#715E50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </li>

            <li>
              {animalFriendliness && (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      d="M12 12C13.5 12 15.3 13.5 15.3 15.5C15.3 17.5 13.5 19 12 19C10.5 19 8.7 17.5 8.7 15.5C8.7 13.5 10.5 12 12 12ZM4.5 6C5.3 6 6.5 7.5 6.5 9C6.5 10.5 5.3 12 4.5 12C3.7 12 2.5 10.5 2.5 9C2.5 7.5 3.7 6 4.5 6ZM19.5 6C20.3 6 21.5 7.5 21.5 9C21.5 10.5 20.3 12 19.5 12C18.7 12 17.5 10.5 17.5 9C17.5 7.5 18.7 6 19.5 6ZM6 18C7 18 8.5 19.5 8.5 21C8.5 22.5 7 24 6 24C5 24 3.5 22.5 3.5 21C3.5 19.5 5 18 6 18ZM18 18C19 18 20.5 19.5 20.5 21C20.5 22.5 19 24 18 24C17 24 15.5 22.5 15.5 21C15.5 19.5 17 18 18 18Z"
                      stroke="#715E50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;