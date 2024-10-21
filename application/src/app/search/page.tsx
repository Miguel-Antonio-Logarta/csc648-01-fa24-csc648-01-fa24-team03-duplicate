"use client"

import Map from "./Map";

const Page = () => {
    return (
        <main className="grid grid-cols-[2fr_3fr]">
            <div className="shadow-2xl z-10">Search</div>
            <Map />
        </main>
    );
}

export default Page;