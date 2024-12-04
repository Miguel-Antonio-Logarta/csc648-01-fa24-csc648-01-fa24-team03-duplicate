import React from 'react';
import Image from 'next/image';
import FakeStars from './fake_stars.svg';
import BusyRating from '../components/BusyRating';

interface ReviewCardProps {
  author: string;
  rating: number;
  review: string;
  creationDate: string;
}

const ReviewCard = ({ author, rating, review, creationDate }: ReviewCardProps) => {
  return (
    <article className="flex relative flex-col px-6 pt-4 pb-10 mt-6 w-full bg-rose-100 rounded-xl border-rose-300 border-solid border-[9px] max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between w-full">
        <h3 className="font-bold text-base tracking-widest text-stone-600">{author}</h3>
        <Image src={FakeStars} alt="placeholder stars" className='' />
      </div>

      {/* remove this Rating <p> when stars are functional */}
      <p className="text-base tracking-widest text-stone-600">Rating: {rating}</p>
      <p className="mt-4 text-sm text-stone-600 max-md:mr-2">{review}</p>
      <p className="text-base tracking-widest text-stone-600">Date Written: {new Date(creationDate).toDateString()}</p>
    </article>
  );
};

export default ReviewCard;