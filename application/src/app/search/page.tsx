"use client"

import SearchResults from "./SearchResults";
import Map from "../components/Map";

const Page = () => {
    return (
        <main className="grid grid-cols-[2fr_3fr]">
            <SearchResults />
            <Map />
        </main>
    );
}

export default Page;