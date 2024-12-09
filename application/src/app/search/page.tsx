'use client';

import Map from '../components/Map';
import styles from './page.module.css';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../context/SearchContext';
import SearchResults from '../components/SearchResults';
import FilterOptions, { FilterOptionsType } from '../components/FilterOptions';
import { LocationData } from '../api/locations/route';
import useLocationSearch from '../hooks/useLocationSearch';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import Loading from './loading';
import ListingLoading from '../components/loading/ListingLoading';
import { useRouter } from "next/navigation";
import { featureMapping } from '../utils/maps';


// This is causing an error. Put fetch inside the component instead. Redo this later
// When I want to use the suspense API for a loading ui 
// function fetchLocations() {
//   let status = 'pending';
//   let result: unknown;

//   const promise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations/`, {
//     // const promise = fetch(`/api/locations/`, {
//     method: 'GET',
//   })
//     .then((response) => { console.log("HIIIIIIIIIII"); return response.json()})
//     .then((data: unknown) => {
//       console.log(data);

//       status = 'success';
//       result = data;
//     })
//     .catch((error) => {
//       status = 'error';
//       result = error;
//     });

//   return {
//     read() {
//       if (status === 'pending') {
//         throw promise;
//       } else if (status === 'error') {
//         throw result;
//       } else if (status === 'success') {
//         return result;
//       }
//     },
//   };
// }

// const dataWrapper = fetchLocations();
// const locationData = dataWrapper.read() as LocationData[];

// const { setLocations } = useContext(SearchContext);
// const searchParams = useSearchParams();
// const { locations, loading } = useLocationSearch(searchParams.get("query")!.toString())
//   Todo: Read from URL params and change filter search results from that
// useEffect(() => {
//   fetch("/api/locations/")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       setLocations(data);
//     });
// }, [setLocations]);

// useEffect(() => {
//   setLocations(locationData);
// });

/**
 * @Notes - This function is used to handle the filter change
 * @Developer Notes - This function could be better programmed its really hacky
 * @param filters - The Filter Options
 * @param router - Used to update the URL
 */
function handleFilterChange(filters: FilterOptionsType, router: any, searchParams: ReadonlyURLSearchParams) {
  const filterParams = new URLSearchParams(searchParams.toString()); // Start with the current search params

  // Set or unset filter parameters
  if (filters.distance) {
    filterParams.set('distance', filters.distance.toString());
  } else {
    filterParams.delete('distance');
  }

  if (filters.rating) {
    filterParams.set('rating', filters.rating.toString());
  } else {
    filterParams.delete('rating');
  }

  if (filters.category) {
    filterParams.set('category', filters.category);
  } else {
    filterParams.delete('category');
  }

  // find the amenities that are selected and add them to the URL
  // otherwise remove them from the URL
  Object.keys(featureMapping).forEach((amenity) => {
    const property = featureMapping[amenity as keyof typeof featureMapping];
    if (filters.amenities.includes(amenity)) {
      filterParams.set(property, 'true');
    } else {
      filterParams.delete(property);
    }
  });

  // If filterParams has content, update the URL with the new search parameters
  if (filterParams.toString()) {
    router.push(`?${filterParams.toString()}`, undefined, { shallow: true });
  } else {
    // If filterParams is empty, remove the query from the URL
    router.push(`/search?`, undefined, { shallow: true });
  }
}

const testData = async () => {
  setTimeout(() => {
    console.log("I am loading");
  }, 5000);
  return 5;
}

/**
 * Where do I place the rendering logic?
 * Placing it on page,
 * @returns read
 */
const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locations, loading } = useLocationSearch(searchParams.toString());
  const [filterSidebar, setFilterSidebar] = useState(false);
  const [filters, setFilters] = useState<FilterOptionsType>({
    distance: 0,
    rating: 0,
    category: "",
    amenities: [],
  });

  const handleFilterClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFilterSidebar(!filterSidebar);
  };
  useEffect(() => {
    //console.log("[INFO]: useEffect should be called here?");
    // console.log("[INFO] Search Params: ", searchParams);
    // console.log("[INFO] Locations: ", locations);
    // console.log("[INFO] Filters: ", filters);
    handleFilterChange(filters, router, searchParams);
  }, [locations, searchParams, filters, router]);

  // return (<Loading />)

  return (
    <main className={`grid grid-cols-[auto_2fr_3fr] ${styles['main-content']}`}>
      {filterSidebar ? <FilterOptions filters={filters} setFilters={setFilters} /> : <div></div>}
      {loading ? <ListingLoading /> : <SearchResults locations={locations} onFilterClick={handleFilterClick} />}
      <Map locations={locations} />
    </main>
  );

};

export default Page;
