"use client"

import SearchResults from "./SearchResults";
import Map from "./Map";

const Page = () => {
    return (
        <main className="grid grid-cols-[2fr_3fr]">
            <SearchResults />
            <Map />
        </main>
    );
}

export default Page;