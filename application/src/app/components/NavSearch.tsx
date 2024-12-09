'use client';

import MagnifyingGlass from './icons/MagnifyingGlass';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState, useEffect, useContext } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { GoogleMapsLibraryContext } from '../context/GoogleMapsLibraryContext';

function NavSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const { isLoaded } = useContext(GoogleMapsLibraryContext);

  // Set the initial text of the search bar
  // If there is a query in the URL, set it to be the
  const [keywordsQuery, setKeywordsQuery] = useState(() => {
    if (
      pathname.startsWith('/search') &&
      searchParams !== null &&
      searchParams.has('name')
    ) {
      return searchParams.get('name')!.toString();
    } else {
      return '';
    }
  });

  const [addressQuery, setAddressQuery] = useState(() => {
    if (
      pathname.startsWith('/search') &&
      searchParams !== null &&
      searchParams.has('address')
    ) {
      return searchParams.get('address')!.toString();
    } else {
      return '';
    }
  });

  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  const [showPredictions, setShowPredictions] = useState<boolean>(false);

  const fetchPredictions = useDebouncedCallback((addressQuery: string) => {
    // We recieve an array of predictions. Each prediction is structured like this:
    // {
    //     "description": "San Francisco, CA, USA",
    //     "matched_substrings": [
    //       {
    //         "length": 1,
    //         "offset": 0
    //       }
    //     ],
    //     "place_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
    //     "reference": "ChIJIQBpAG2ahYAR_6128GcTUEo",
    //     "structured_formatting": {
    //       "main_text": "San Francisco",
    //       "main_text_matched_substrings": [
    //         {
    //           "length": 1,
    //           "offset": 0
    //         }
    //       ],
    //       "secondary_text": "CA, USA"
    //     },
    //     "terms": [
    //       {
    //         "offset": 0,
    //         "value": "San Francisco"
    //       },
    //       {
    //         "offset": 15,
    //         "value": "CA"
    //       },
    //       {
    //         "offset": 19,
    //         "value": "USA"
    //       }
    //     ],
    //     "types": [
    //       "locality",
    //       "political",
    //       "geocode"
    //     ]
    //   }
    const autocompleteService = new google.maps.places.AutocompleteService();

    autocompleteService.getPlacePredictions(
      {
        input: addressQuery,
        componentRestrictions: { country: 'us' },
        types: ['geocode'],
      }, // Restrict to addresses
      (
        predictions: google.maps.places.AutocompletePrediction[] | null,
        status
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setPredictions(predictions || []);
        }
      }
    );
  }, 300);

  useEffect(() => {
    // Check if our Places API has loaded and user has entered an address.
    if (!isLoaded || !addressQuery.trim()) {
      return;
    }

    fetchPredictions(addressQuery); // Make request to Google's API for address autocompletion
  }, [isLoaded, addressQuery, fetchPredictions]);

  const handleAddressFocus = (e: React.FocusEvent<HTMLElement>) => {
    e.preventDefault();
    setShowPredictions(true);
  };

  const handleAddressBlur = (e: React.FocusEvent<HTMLElement>) => {
    e.preventDefault();
    // Only hide if the blur is not caused by clicking on the div
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowPredictions(false);
    }
  };

  // Handle search bar changes. If it is at the /search page, update the url parameters too
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    // Update input values
    if (e.target.name === 'keywords') {
      setKeywordsQuery(e.target.value);
    } else if (e.target.name === 'address') {
      setAddressQuery(e.target.value);
    }
  }

  // Handle Enter/Submit event depending on the page that the user is in.
  // On Submit, take the place_id and get the geocode. Or maybe take the address and get the geocode
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    params.set('name', keywordsQuery.trim() || '');

    if (addressQuery.trim()) {
      params.set('address', addressQuery);
    }

    push(`/search?${params.toString()}`); // Go to search page with query
  }

  const handlePlaceSelection = (desc: string, place_id: string) => {
    setAddressQuery(desc);
  };

  return (
    <form
      className="flex items-stretch shadow-md bg-white rounded-full border-2 border-transparent hover:border-2 hover:border-slate-400 focus-within:border-2 focus-within:border-slate-400"
      onSubmit={handleSubmit}
    >
      {/* Left searchbar: Keyword search */}
      <input
        name="keywords"
        className="min-w-0 max-w-96 outline-none pl-6 bg-transparent"
        placeholder="Cafes, libraries, parks..."
        autoComplete="off"
        onChange={handleChange}
        value={keywordsQuery}
      />
      <div className="border-l-2 my-2 border-neutral-300"></div>

      {/* Right searchbar: Address with an autocomplete feature */}
      <div
        className="min-w-0 max-w-96 relative"
        onFocus={handleAddressFocus}
        onBlur={handleAddressBlur}
        tabIndex={-1} // Makes the parent focusable
      >
        <input
          name="address"
          className="min-w-0 max-w-96 h-full outline-none pl-6 bg-transparent"
          placeholder="In San Francisco..."
          autoComplete="off"
          onChange={handleChange}
          value={addressQuery}
          onFocus={handleAddressFocus}
        />
        {showPredictions && (
          <div className="absolute top-full w-96 shadow-md rounded-b-xl">
            {predictions.map((prediction) => (
              <div
                key={prediction.place_id}
                className="px-6 py-2 bg-white hover:bg-columbia-blue active:bg-jordy-blue hover:font-medium hover:cursor-pointer border-x-2 border-x-slate-400 first:border-t-2 first:border-t-neutral-200 last:border-b-2 last:border-b-slate-400 last:rounded-b-xl"
                onClick={(e) => {
                  e.preventDefault();
                  handlePlaceSelection(
                    prediction.description,
                    prediction.place_id
                  );
                }}
              >
                {prediction.description}
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="pr-6 ">
        <MagnifyingGlass className="my-auto ml-4" size={20} />
      </button>
    </form>
  );
}

export default NavSearch;
