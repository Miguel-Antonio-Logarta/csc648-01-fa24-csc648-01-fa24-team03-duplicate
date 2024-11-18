"use client";

import Bio from "./bio"; // Import the Bio component from its folder
import Layout from "./layout"; // Import Layout if you want to use it to wrap the page content
import BookmarksBox from "./BookmarksBox"; // Capitalize component name
import { useSession } from "next-auth/react";
import Unauthorized from '../components/Unauthorized';

const Page = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') return;

    if (status === 'unauthenticated') {
        return <Unauthorized />;
    }
    
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <Bio session={session}/>
            <BookmarksBox />

        </div>
    );
}

export default Page;
