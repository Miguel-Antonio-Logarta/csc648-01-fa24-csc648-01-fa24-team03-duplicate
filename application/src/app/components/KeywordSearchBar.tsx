
import MagnifyingGlass from './icons/MagnifyingGlass'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, Suspense, useState } from 'react';
import { useDebouncedCallback } from "use-debounce";
import { geocodeByAddress } from 'react-places-autocomplete';
import { getRedirectStatusCodeFromError } from 'next/dist/client/components/redirect';


type KeywordSearchBarProps = {
  keywordSearch: string;
  setKeywordSearch: React.Dispatch<React.SetStateAction<string>>;
}

// Do I want to pass input values down as props, or should keywordsearchbar 
// Have their own state?
// onSubmit, the logic will either read the url parameters, or take the state variables

const KeywordSearchBar = (props: KeywordSearchBarProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState(() => {
    if (pathname.startsWith("/search") && searchParams !== null && searchParams.has("name")) {
        return searchParams.get("name")!.toString();
    } else {
        return ""
    }
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearchQuery(e.target.value);
  }

  return (
    <input 
      name="search"
      className="min-w-0 max-w-96 outline-none pl-6 bg-transparent" 
      placeholder="Cafes, libraries, parks..." 
      autoComplete='off'
      onChange={handleChange} 
      value={searchQuery}
    />
  );
};

export default KeywordSearchBar;