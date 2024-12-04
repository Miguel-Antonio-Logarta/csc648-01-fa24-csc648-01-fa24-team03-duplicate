import React, { useState } from "react";


type FilterOptionsProps = {
  filters: FilterOptionsType;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptionsType>>;
}

export type FilterOptionsType = {
  distance: number;
  rating: number;
  category: string,
  amenities: string[],
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ filters, setFilters }) => {
  const categories = [
    "CAFE",
    "LIBRARY",
    "PARK",
  ];

  const features = [
    "Wifi",
    "Animal Friendly",
  ];

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      distance: Number(e.currentTarget.value)
    })
  };

  const handleCategoryClick = (category: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: prevFilters.category === category ? "" : category, // Toggle category selection
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rating: prevFilters.rating === rating ? 0 : rating, // Toggle rating selection
    }));
  };

  // Reset filters to initial state
  const resetFilters = () => {
    setFilters({
      distance: 0,
      rating: 0,
      category: "",
      amenities: [], // Reset amenities to an empty array
    });
  };

  return (
    (
      <div className="flex flex-col items-start text-left justify-start p-6 bg-blue-50 rounded-lg font-shantell">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Filter by</h2>

        {/* Distance Filter */}
        <div className="mb-6 w-full max-w-md bg-columbia-blue p-4 rounded-lg">
          <label className="block mb-2 font-semibold text-blue-800">Distance</label>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={filters.distance}
            onChange={handleDistanceChange}
            className="w-full accent-cherry-blossom-pink"
          />
          <p className="mt-2 text-blue-800">{filters.distance} mi</p>
        </div>

        {/* Rating Filter */}
        <div className="mb-6 w-full max-w-md bg-columbia-blue p-4 rounded-lg">
          <label className="block mb-2 font-semibold text-blue-800">Stars</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingClick(star)}
                className={`text-2xl ${filters.rating >= star ? "text-cherry-blossom-pink" : "text-gray-300"
                  }`}
              >
                ★
              </button>
            ))}
          </div>
          <p className="mt-2 text-blue-900">{filters.rating}</p>
        </div>

        {/* Category Filter */}
        <div className="mb-6 w-full max-w-md bg-columbia-blue p-4 rounded-lg">
          <label className="block mb-2 font-semibold text-blue-800">Category</label>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full border ${filters.category === category
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300"
                  } hover:border-blue-500`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Filter */}
        <div className="mb-6 w-full max-w-md bg-columbia-blue p-4 rounded-lg">
          <label className="block mb-2 font-semibold text-blue-800">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {features.map((amenity) => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  value={amenity.toLowerCase()}
                  checked={filters.amenities.includes(amenity)}  // Check if the amenity is in the selected list
                  className="mr-2"
                  onChange={(e) => {
                    const updatedAmenities = e.target.checked
                      ? [...filters.amenities, amenity]
                      : filters.amenities.filter((item) => item !== amenity);
                    setFilters({
                      ...filters,
                      amenities: updatedAmenities,
                    });
                  }}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-4 w-full max-w-md">
          <button
            onClick={resetFilters}
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    ));
};

export default FilterOptions;