"use client"

import MagnifyingGlass from './icons/MagnifyingGlass'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState, useEffect, useContext } from 'react';
import { useDebouncedCallback } from "use-debounce";
import { GoogleMapsLibraryContext } from '../context/GoogleMapsLibraryContext';


function NavSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace, push } = useRouter();
    const { isLoaded } = useContext(GoogleMapsLibraryContext);

    // Set the initial text of the search bar
    // If there is a query in the URL, set it to be the 
    const [keywordsQuery, setKeywordsQuery] = useState(() => {
        if (pathname.startsWith("/search") && searchParams !== null && searchParams.has("name")) {
            return searchParams.get("name")!.toString();
        } else {
            return ""
        }
    });

    const [addressQuery, setAddressQuery] = useState(() => {
        if (pathname.startsWith("/search") && searchParams !== null && searchParams.has("address")) {
            return searchParams.get("address")!.toString();
        } else {
            return ""
        }
    });

    // // Method 1: Using a ref to get the autocomplete suggestions
    // const addressRef = useRef<HTMLInputElement>(null);
    // useEffect(() => {
    //     if (!isLoaded || loadError) return;
    
    //     const options = {
    //       componentRestrictions: { country: "us" },
    //       fields: ["address_components", "geometry"],
    //     };
        
    //     const handlePlaceChanged = async(address: any) => {
    //         if (!isLoaded) return;
    //         const place = address.getPlace()
        
    //         if (!place || !place.geometry) {
    //             // Set input box
    //             setAddressQuery("");
    //         //   setInput({});
    //           return;
    //         }
    
    //         formData(place);
    //     };

    //     if (addressRef.current) {
    //         const autocomplete = new google.maps.places.Autocomplete(addressRef.current, options);
    //         autocomplete.addListener("place_changed", () => handlePlaceChanged(autocomplete));
    //     }
    
    //     // return () => autocomplete.removeListener("place_changed", handlePlaceChanged);
    // }, [isLoaded, loadError]);
    // const formData = (place: any) => {
    //     // Set input state here.
    //     console.log(place);
    // }
    

    // Method 2: Getting the input results directly
    // Example of a autocomplete prediction object. We recieve an array of these objects
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
    // The styling could maybe go like this:
    // Regular black text for main_text, smaller gray text with 
    const [predictions, setPredictions] = useState<any[]>([]);
    const [showPredictions, setShowPredictions] = useState(false);
    const fetchPredictions = useDebouncedCallback((addressQuery: string) => {
        const autocompleteService = new google.maps.places.AutocompleteService();
            
            autocompleteService.getPlacePredictions(
                { 
                    input: addressQuery,
                    componentRestrictions: { country: 'us'}, 
                    types: ["geocode"] 
                }, // Restrict to addresses and latlng
                (predictions: google.maps.places.AutocompletePrediction[] | null, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        // setSuggestions(predictions || []);
                        console.log(predictions);
                        setPredictions(predictions || [])
                    } else {
                        // console.log("Req not successful", status);
                    }
                }
            );
    }, 300);
    useEffect(() => {
        if (!isLoaded || !addressQuery.trim()) {
            console.log("Places API not loaded");
            return;
        } else {
            console.log("Places API loaded");
        }

        fetchPredictions(addressQuery);
    }, [isLoaded, addressQuery, fetchPredictions]);
    const handleAddressFocus = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setShowPredictions(true);
    }
    const handleAddressBlur = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // Only hide if the blur is not caused by clicking on the div
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setShowPredictions(false);
        }
    }
    // const [predictionsVisible, setPredictionsVisible] = useState(false);
    
    // // When the search bar's text changes, update the url parameters every 300ms (debouncing)
    // const handleKeywordsChange = useDebouncedCallback((keywords: string) => {
    //     const params = new URLSearchParams(searchParams);

    //     if (keywords.trim()) {
    //         params.set("name", keywords.trim());  // If search bar is not empty, set query parameters
    //     } else {
    //         params.delete("name");     // Else delete query ? in the url.
    //     }

    //     replace(`${pathname}?${params.toString()}`);    // Replace url
    // }, 300);

    // const handlePlaceChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     // setPlaceQuery(e.target.value);

    //     // if (pathname.startsWith("/search")) {
    //     //     handleSearch(e.target.value);
    //     // }
    // }

    // Handle search bar changes. If it is at the /search page, update the url parameters too
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        // Update input values
        if (e.target.name === "keywords") {
            setKeywordsQuery(e.target.value);
            console.log("Keywords: ", e.target.value);
        } else if (e.target.name === "address") {
            setAddressQuery(e.target.value);
            console.log("Address: ", e.target.value);
        }


        // // So the main thing is where to use the debounce
        // // Do I want to debounce
        // // Get suggestions (debouncing will be used here)
        // if (e.target.name === "address") {
        //     // Address validation using Google Places API
        // }

        // // Update URL parameters if on /search (debouncing will be used here)
        // if (pathname.startsWith("/search")) {
        //     if (e.target.name === "keywords") {
        //         changeKeywordsURL(e.target.value);
        //     } else if (e.target.name === "address") {

        //     }
        // } 
    }

    // Handle Enter/Submit event depending on the page that the user is in.
    // On Submit, take the place_id and get the geocode. Or maybe take the address and get the geocode
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // if (keywordsQuery.trim()) {
            const params = new URLSearchParams(searchParams);
            
            // if (keywordsQuery.trim()) {
            //     params.set("name", keywordsQuery.trim());
            // } 

            params.set("name", keywordsQuery.trim() || "");
            
            if (addressQuery.trim()) {
                // params.set("address", addressQuery.trim());
                // const result = geocodeByAddress(addressQuery);
                params.set("address", addressQuery)

                // console.log(result);
            }
            

            push(`/search?${params.toString()}`);    // Go to search page with query
        // }
    }

    const changeKeywordsURL = useDebouncedCallback((keywords: string) => {
        const params = new URLSearchParams(searchParams);

        if (keywords.trim()) {
            params.set("name", keywords.trim());  // If search bar is not empty, set query parameters
        } else {
            params.delete("name");     // Else delete query ? in the url.
        }

        replace(`${pathname}?${params.toString()}`);    // Replace url
    }, 300);

    const handlePlaceSelection = (desc: string, place_id: string) => {
        setAddressQuery(desc);
    }

    

    return (
        <form 
            className="flex items-stretch shadow-md bg-white rounded-full border-2 border-transparent hover:border-2 hover:border-slate-400 focus-within:border-2 focus-within:border-slate-400"
            onSubmit={handleSubmit}
        >
            <input 
                name="keywords"
                className="min-w-0 max-w-96 outline-none pl-6 bg-transparent" 
                placeholder="Cafes, libraries, parks..." 
                autoComplete='off'
                onChange={handleChange} 
                value={keywordsQuery}
            />
            <div className='border-l-2 my-2 border-neutral-300'></div>

            {/* TODO: Add a location query */}
            {/* Method 1: using a ref */}
            {/* <input 
                name="address"
                // ref={addressRef}
                className="min-w-0 max-w-96 outline-none pl-6 bg-transparent" 
                placeholder="In San Francisco..." 
                autoComplete='off'
                onChange={handleChange} 
                value={addressQuery}
            /> */}

            {/* Method 2: Directly using the autocomplete service */}
            <div 
                className='min-w-0 max-w-96 relative'
                onFocus={handleAddressFocus}
                onBlur={handleAddressBlur}
                tabIndex={-1} // Makes the parent focusable
            >
                <input 
                    name="address"
                    className="min-w-0 max-w-96 h-full outline-none pl-6 bg-transparent" 
                    placeholder="In San Francisco..." 
                    autoComplete='off'
                    onChange={handleChange} 
                    value={addressQuery}
                    // onFocus={() => setShowPredictions(true)}
                    onFocus={handleAddressFocus}
                    // onBlur={() => setShowPredictions(false)}
                />
                {showPredictions && 
                    <div className='absolute top-full w-96 shadow-md rounded-b-xl'>
                        {predictions.map((prediction) => 
                            <div 
                                key={prediction.place_id} 
                                className='px-6 py-2 bg-white hover:bg-columbia-blue active:bg-jordy-blue hover:font-medium hover:cursor-pointer border-x-2 border-x-slate-400 first:border-t-2 first:border-t-neutral-200 last:border-b-2 last:border-b-slate-400 last:rounded-b-xl'
                                onClick={(e) => {e.preventDefault(); handlePlaceSelection(prediction.description, prediction.place_id);}}
                            >  
                                {prediction.description}
                            </div>
                        )}
                    </div>
                //      <div className='invisible focus:visible peer-focus:visible absolute top-full w-96 shadow-md rounded-b-xl'>
                //      {predictions.map((prediction) => 
                //          <div 
                //              key={prediction.place_id} 
                //              className='px-6 py-2 bg-white hover:bg-columbia-blue active:bg-jordy-blue hover:font-medium hover:cursor-pointer border-x-2 border-x-slate-400 first:border-t-2 first:border-t-neutral-200 last:border-b-2 last:border-b-slate-400 last:rounded-b-xl'
                //              onClick={(e) => {e.preventDefault(); handlePlaceSelection(prediction.description, prediction.place_id);}}
                //          >  
                //              {prediction.description}
                //          </div>
                //      )}
                //  </div>
                }
            </div>

            <button type='submit' className='pr-6 '>
                <MagnifyingGlass className="my-auto ml-4" size={20} />
            </button>
        </form>
    );
}

export default NavSearch