import React from 'react';
import Image from "next/image";
import Link from 'next/link';

interface LocationCardProps {
  backgroundColor: string;
  borderColor: string;
  id: string;
  title: string;
  subtitle: string;
  rating: number;
  imageUrl: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ 
  backgroundColor, 
  borderColor,
  id, 
  title, 
  subtitle, 
  rating, 
  imageUrl 
}) => {
  return (
    <article className={`grow px-16 py-11 w-full rounded-3xl border-solid border-[9px] max-md:px-5 max-md:mt-10 max-md:max-w-full ${backgroundColor} ${borderColor}`}>
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
          <div className="flex shrink-0 mx-auto h-36 rounded-xl bg-neutral-400 w-[152px] max-md:mt-10">
            <Image src={imageUrl} alt={title} width={256} height={256} />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col items-start w-full max-md:mt-10">
            <h2 className="self-stretch text-xl font-semibold text-stone-600 tracking-[2px]">
              {title}
            </h2>
            <p className="mt-2.5 text-base tracking-widest text-stone-600">
              {subtitle}
            </p>
            <div className="flex gap-6 mt-5">
              <StarRating rating={rating} />
              <span className="my-auto text-2xl text-stone-600 tracking-[2.4px]">
                {rating.toFixed(2)}
              </span>
            </div>
            <div className='font-josefin'>
            Location Details
            </div>
            <Link href={`/quickInfo/${id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> View Details</Link>
            {/* <img //make as individual icons
              loading="lazy" 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9197e9dc0f9332e7157e8c35e4ae08655d77919c4ea037fa505b2315ad3c565?placeholderIfAbsent=true&apiKey=dae5425d3b3c4cdc84ccb32ea9568225" 
              alt="Location details" 
              className="object-contain mt-4 max-w-full aspect-[5.46] w-[131px]" 
            /> */}
          </div>
        </div>
      </div>
    </article>
  );
};

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = Array(5).fill(null).map((_, index) => (
    // <img 
    //   key={index}
    //   loading="lazy"
    //   src={index < Math.floor(rating) ? "https://cdn.builder.io/api/v1/image/assets/TEMP/2826f8b07fc86866096715b9202c725dc1fda2b4f739e3772d9c463d36f9eb5d?placeholderIfAbsent=true&apiKey=dae5425d3b3c4cdc84ccb32ea9568225" : "https://cdn.builder.io/api/v1/image/assets/TEMP/c11d328f5548efb7e5898c1b7d71921021fc2e6213956b23aa9c4c2fe8253cc4?placeholderIfAbsent=true&apiKey=dae5425d3b3c4cdc84ccb32ea9568225"}
    //   alt={index < Math.floor(rating) ? "Filled star" : "Empty star"}
    //   className="object-contain shrink-0 aspect-[1.06] w-[33px]"
    // /> couldn't use builder
    <div key={index}>
      star
    </div>
  ));

  return (
    <div className="flex gap-1.5">
      {stars}
    </div>
  );
};

export default LocationCard;
