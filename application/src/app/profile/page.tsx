"use client";

import Bio from "./bio"; // Import the Bio component from its folder
import Layout from "./layout"; // Import Layout if you want to use it to wrap the page content
import BookmarksBox from "./BookmarksBox"; // Capitalize component name

const Page = () => {
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <Bio />
            <BookmarksBox />

        </div>
    );
}

export default Page;
