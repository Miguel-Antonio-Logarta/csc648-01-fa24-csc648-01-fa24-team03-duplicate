'use client';

import Map from '../components/Map';
import styles from './page.module.css';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../context/SearchContext';
import SearchResults from '../components/SearchResults';
import FilterOptions from '../components/FilterOptions';
import { LocationData } from '../api/locations/route';

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

/**
 * Where do I place the rendering logic?
 * Placing it on page,
 * @returns read
 */
const Page = () => {
  // const locationData = dataWrapper.read() as LocationData[];

  const { setLocations } = useContext(SearchContext);
  const [filterSidebar, setFilterSidebar] = useState(false);
  //   Todo: Read from URL params and change filter search results from that
  useEffect(() => {
    fetch("/api/locations/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLocations(data);
      });
  }, [setLocations]);

  // useEffect(() => {
  //   setLocations(locationData);
  // });

  const handleFilterClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFilterSidebar(!filterSidebar);
  };

  return (
    <main className={`grid grid-cols-[auto_2fr_3fr] ${styles['main-content']}`}>
      {filterSidebar ? <FilterOptions /> : <div></div>}
      <SearchResults onFilterClick={handleFilterClick} />
      <Map />
    </main>
  );
};

export default Page;
