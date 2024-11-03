"use client"

import SearchResults from "./SearchResults";
import Map from "../components/Map";
import styles from "./page.module.css"

const Page = () => {
    return (
        <main className={`grid grid-cols-[2fr_3fr] ${styles["main-content"]}`}>
            <SearchResults />
            <Map />
        </main>
    );
}

export default Page;