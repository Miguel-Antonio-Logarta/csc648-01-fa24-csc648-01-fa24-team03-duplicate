"use client"

import MagnifyingGlass from './icons/MagnifyingGlass'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, Suspense, useState } from 'react';
import { useDebouncedCallback } from "use-debounce";

// TODO: Add a timer that only queries the server every few milliseconds whenever the user changes
// the input (defer)
function NavSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace, push } = useRouter();

    // Set the initial text of the search bar
    // If there is a query in the URL, set it to be the 
    const [searchQuery, setSearchQuery] = useState(() => {
        if (pathname.startsWith("/search") && searchParams !== null && searchParams.has("name")) {
            return searchParams.get("name")!.toString();
        } else {
            return ""
        }
    });

    // When the search bar's text changes, update the url parameters every 300ms (debouncing)
    const handleSearch = useDebouncedCallback((searchQuery: string) => {
        const params = new URLSearchParams(searchParams);

        if (searchQuery.trim()) {
            params.set("name", searchQuery.trim());  // If search bar is not empty, set query parameters
        } else {
            params.delete("name");     // Else delete query ? in the url.
        }

        replace(`${pathname}?${params.toString()}`);    // Replace url
    }, 300);

    // Handle search bar changes. If it is at the /search page, update the url parameters too
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setSearchQuery(e.target.value);

        if (pathname.startsWith("/search")) {
            handleSearch(e.target.value);
        }
    }

    // Handle Enter/Submit event depending on the page that the user is in.
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!pathname.startsWith("/search") && searchQuery.trim()) {
            console.log("redirecting")
            const params = new URLSearchParams(searchParams);
            params.set("name", searchQuery.trim());
            push(`/search?${params.toString()}`);    // Go to search page with query
        } else {
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