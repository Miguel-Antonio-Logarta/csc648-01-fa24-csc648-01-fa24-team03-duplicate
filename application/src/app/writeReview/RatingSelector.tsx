import React from 'react';
import Image from 'next/image';
import FakeStars from './fake_stars.svg';

interface RatingSelectorProps {
  onRatingChange: (newRating: string) => void;
  onBusynessStatusChange: (newBusynessStatus: string) => void;
}

function RatingSelector({ onRatingChange, onBusynessStatusChange }: RatingSelectorProps) {
  
  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onRatingChange(e.target.value);
  }

  const handleBusynessStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onBusynessStatusChange(e.target.value);
  }

  return (
    <div className="font-josefin flex gap-large p-2  max-md:ml-1">
      <Image src={FakeStars} alt='fake stars'/>
      <label htmlFor="rating" className="my-auto pl-2 justify-center basis-auto">Select your rating</label>
      {/* <select id="rating" className="sr-only" aria-label="Select your rating">
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select> */}
      <select id="rating" className="" aria-label="Select your rating" onChange={handleRatingChange}>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>

      <select id="busynessStatus" className="" aria-label="Select how busy this location was" onChange={handleBusynessStatusChange}>
        <option value="1">1 - Not Busy</option>
        <option value="2">2 - Somewhat busy</option>
        <option value="3">3 - Neutral</option>
        <option value="4">4 - Usually Busy</option>
        <option value="5">5 - Always Busy</option>
      </select>

    </div>
  );
}

export default RatingSelector;