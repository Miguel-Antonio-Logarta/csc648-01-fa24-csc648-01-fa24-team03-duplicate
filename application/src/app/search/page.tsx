"use client";

import Map from "../components/Map";
import styles from "./page.module.css";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import SearchResults from "../components/SearchResults";
import FilterOptions from "../components/FilterOptions";
import { LocationData } from "../api/locations/route";

function fetchLocations() {
  let status = 'pending';
  let result: unknown;

  const promise = fetch("/api/locations/")
  .then((response) => response.json())
  .then((data: unknown) => {
    console.log(data);

    status = 'success';
    result = data;
  })
  .catch((error) => {
    status = 'error';
    result = error;
  })

  return {
    read() {
      if (status === 'pending') {
        throw promise;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  }
}

const dataWrapper = fetchLocations();

/**
 * Where do I place the rendering logic?
 * Placing it on page, 
 * @returns read
 */
const Page = () => {
  const locationData = dataWrapper.read() as LocationData[];
  const { setLocations } = useContext(SearchContext);
  const [filterSidebar, setFilterSidebar] = useState(false);
  // //   Todo: Read from URL params and change filter search results from that
  // useEffect(() => {
  //   fetch("/api/locations/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setLocations(data);
  //     });
  // }, [setLocations]);

  useEffect(() => {
    setLocations(locationData);
  })

  const handleFilterClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFilterSidebar(!filterSidebar);
  };

  return (
    <main className={`grid grid-cols-[auto_2fr_3fr] ${styles["main-content"]}`}>
      {filterSidebar ? <FilterOptions /> : <div></div>}
      <SearchResults onFilterClick={handleFilterClick} />
      <Map />
    </main>
  );
};

export default Page;
