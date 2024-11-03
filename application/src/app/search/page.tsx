"use client";

import Map from "../components/Map";
import styles from "./page.module.css";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import SearchResults from "../components/SearchResults";
import FilterOptions from "../components/FilterOptions";

const Page = () => {
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
