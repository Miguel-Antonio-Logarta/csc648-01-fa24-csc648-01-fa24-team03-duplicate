import React from 'react';
import Image from 'next/image';
import FakeStars from './fake_stars.svg';

function RatingSelector() {
  return (
    <div className="font-josefin flex gap-large p-2  max-md:ml-1">
      <Image src={FakeStars} alt='fake stars'/>
      <label htmlFor="rating" className="my-auto pl-2 justify-center basis-auto">Select your rating</label>
      <select id="rating" className="sr-only" aria-label="Select your rating">
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>
    </div>
  );
}

export default RatingSelector;