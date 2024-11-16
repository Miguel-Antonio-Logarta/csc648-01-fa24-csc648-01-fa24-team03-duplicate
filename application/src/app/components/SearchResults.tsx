'use client';

import Filter from './icons/Filter';
import Listing from './Listing';
import styles from '../components/components.module.css';
import { Suspense, useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import { LocationData } from '../api/locations/route';
import ListingLoading from './loading/ListingLoading';
import NotebookPaper from './NotebookPaper';

// On mount, read url query parameters
// Query the database with these search parameters
// Render results out as a list of components

type SearchResultsProps = {
  onFilterClick: (e: React.SyntheticEvent) => void;
};

/*
  TODO:
  Shadow is not working. This might be because of the CSS of the notebook paper.
  The filters button should also always be visible (optional feature).
  Fix Suspense. It isn't showing the loading ui while fetching data.
*/
function SearchResults(props: SearchResultsProps) {
  const { locations, setSelectedLocation } = useContext(SearchContext);

  const handleLocationSelect = (data: LocationData) => {
    const newLocation = { ...data }; // Necessary to create a copy so that the map will update
    setSelectedLocation(newLocation);
  };

  return (
      <NotebookPaper>
          <div className='h-full px-6 py-4 h-full overflow-y-scroll'>
            <button
              onClick={props.onFilterClick}
              className="flex no-wrap items-center gap-1.5 rounded-full bg-[#C6E2FF] px-6 py-2 font-josefin"
            >
              <Filter size={20} />
              <span className="align-text-bottom">Filters</span>
            </button>
            <div className="flex flex-col gap-6 mt-6">
              {/* Suspense UI is not working */}
              <Suspense
                fallback={Array.from({ length: 4 }, (_, index) => (
                  <ListingLoading key={index} />
                ))}
              >
                {locations.map((location) => (
                  <Listing
                    key={location.id}
                    data={location}
                    selectLocation={handleLocationSelect}
                  />
                ))}
              </Suspense>
            </div>
          </div>
      </NotebookPaper>
  );
}

export default SearchResults;
