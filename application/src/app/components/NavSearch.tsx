"use client"

import MagnifyingGlass from './icons/MagnifyingGlass'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, Suspense, useState } from 'react';

function NavSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace, push } = useRouter();

    const [searchQuery, setSearchQuery] = useState(() => {
        if (pathname.startsWith("/search") && searchParams.has("query")) {
            return searchParams.get("query")!.toString();
        } else {
            return ""
        }
    });


    function handleSearch(searchQuery: string) {
        const params = new URLSearchParams(searchParams);

        if (searchQuery.trim()) {
            params.set("query", searchQuery.trim());  // If search bar is not empty, set query parameters
        } else {
            params.delete("query");     // Else delete query ? in the url.
        }

        replace(`${pathname}?${params.toString()}`);    // Replace url
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setSearchQuery(e.target.value);

        if (pathname.startsWith("/search")) {
            handleSearch(e.target.value);
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!pathname.startsWith("/search") && searchQuery.trim()) {
            console.log("redirecting")
            const params = new URLSearchParams(searchParams);
            params.set("query", searchQuery.trim());
            push(`/search?${params.toString()}`);    // Go to search page with query
        } else {
            console.log("Sending query to backend");
            handleSearch(searchQuery);                  // Send query to backend
        }
    }

    return (
        <form 
            className="flex items-stretch shadow-md bg-white rounded-full border-2 border-transparent hover:border-2 hover:border-slate-400"
            onSubmit={handleSubmit}
        >
            <input 
                name="search"
                className="min-w-0 max-w-96 outline-none pl-6 bg-transparent" 
                placeholder="Cafes, libraries, parks..." 
                autoComplete='off'
                onChange={handleChange} 
                value={searchQuery}
            />
            <div className='border-l-2 my-2 border-neutral-300'></div>
            {/* TODO: Add a location query */}
            <input 
                name="searchOrigin"
                className="min-w-0 max-w-96 outline-none pl-6 bg-transparent" 
                placeholder="In San Francisco..." 
                autoComplete='off'
                onChange={(e) => e.preventDefault()} 
                value={""}
            />
            <button type='submit' className='pr-6 '>
                <MagnifyingGlass className="my-auto ml-4" size={20} />
            </button>
        </form>
    );
}

export default NavSearch