import { useState, useCallback, memo } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
}

const mapOptions: google.maps.MapOptions = {
    center: {
        lat: 37.72401337906791,
        lng: -122.47703751563752,
    },
    zoom: 16,
    fullscreenControl: false,
    streetViewControl: false,
    styles: [
        {
          featureType: 'poi', // Hide points of interest labels
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
        {
            featureType: 'poi.park', // Enables labels for parks
            elementType: 'labels',
            stylers: [{ visibility: 'on' }],
        }
      ],
}

const testCoordinates: google.maps.LatLngLiteral[] = [
    {
        lat: 37.72145834654513, 
        lng: -122.47828226733533
    },
    {
        lat: 37.76882261237542, 
        lng: -122.46731071747753
    },
    {
        lat: 37.72212295611043, 
        lng: -122.47859151267485
    },
    {
        lat: 37.740810098737626, 
        lng: -122.50549875122867
    },
]

function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    })
    
    const [map, setMap] = useState<google.maps.Map | null>(null)
    
    const onLoad = useCallback(function callback(map: google.maps.Map) {
        console.log("This is the api key", process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
        
        // // This is just an example of getting and using the map instance!!! don't just blindly copy!
        // const bounds = new window.google.maps.LatLngBounds(center)
        // map.fitBounds(bounds)

        // When a user clicks on a listing/place move the map's camera to center on that location
        // const newCoords = {lat: listing.lat, lng: listing.lng};
        // map.panTo(newCoords);
    
        setMap(map)
    }, [])
    
    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {/* TODO: On click, scroll to the listing on the left */}
          {/* TODO: On click, have a label appear that shows the title and an image of the location */}
          {testCoordinates.map((coordinate) => <Marker position={coordinate} />)}
        </GoogleMap>
      ) : (
        <div className="bg-slate-500 flex align-center justify-center">
            <div>
                Map is loading...
            </div>
        </div>
      )
}

export default memo(Map);