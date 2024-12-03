import React from 'react';

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
    <div className="font-josefin flex gap-6 p-4 max-md:ml-2">
      <div className="flex items-center space-x-2">
        <label htmlFor="rating" className="text-lg font-semibold text-stone-700">Select your rating</label>
        <select id="rating" className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Select your rating" onChange={handleRatingChange}>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="busynessStatus" className="text-lg font-semibold text-stone-700">Select how busy this place was</label>
        <select id="busynessStatus" className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Select how busy this location was" onChange={handleBusynessStatusChange}>
          <option value="1">1 - Not Busy</option>
          <option value="2">2 - Somewhat busy</option>
          <option value="3">3 - Neutral</option>
          <option value="4">4 - Usually Busy</option>
          <option value="5">5 - Always Busy</option>
        </select>
      </div>
    </div>
  );
}

export default RatingSelector;