import { useState, useCallback, memo, useContext, useEffect } from "react";
import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { SearchContext } from "../context/SearchContext";
import { renderToString } from "react-dom/server";
import MarkerIcon from "./icons/Marker";

// Different map pin styles
const mapPinEdited = "M 5.0659545e-8,-176.125 A 40,40 0 1 0 40,-136.125 40,40 0 0 0 5.0659545e-8,-176.125 Z m 0,64 A 24,24 0 1 1 24,-136.125 24,24 0 0 1 5.0659545e-8,-112.125 Z m 0,-112 A 88.1,88.1 0 0 0 -88,-136.125 c 0,31.4 14.51,64.68 42,96.25 a 254.19,254.19 0 0 0 41.4500001,38.3 8,8 0 0 0 9.18,0 A 254.19,254.19 0 0 0 46,-39.875 c 27.45,-31.57 42,-64.85 42,-96.25 A 88.1,88.1 0 0 0 5.0659545e-8,-224.125 Z m 0,206 C -16.53,-31.125 -72,-78.875 -72,-136.125 a 72,72 0 0 1 144,0 c 0,57.23 -55.47,105 -71.999999949340448,118 z";
const mapPinBoldEdited = "M 5.0263818e-7,-184.5 A 44,44 0 1 0 44,-140.5 44.05,44.05 0 0 0 5.0263818e-7,-184.5 Z m 0,64 A 20,20 0 1 1 20,-140.5 20,20 0 0 1 5.0263818e-7,-120.5 Z m 0,-112 A 92.1,92.1 0 0 0 -92,-140.5 c 0,77.360001 81.640001,135.4000009 85.1200005,137.8300009 a 12,12 0 0 0 13.76,0 A 259,259 0 0 0 49.06,-41.669999 C 77.15,-73.929999 92,-108.13 92,-140.5 A 92.1,92.1 0 0 0 5.0263818e-7,-232.5 Z M 31.3,-57.789999 A 249.35,249.35 0 0 1 5.0263818e-7,-27.609999 249.35,249.35 0 0 1 -31.3,-57.789999 C -48,-77.129999 -68,-107.19 -68,-140.5 a 68,68 0 0 1 136,0 c 0,33.31 -20,63.370001 -36.7,82.710001 z";
const mapPinFilledEdited = "m -0.00506667,-224.2533 a 88.1,88.1 0 0 0 -88.00000033,88 c 0,75.3 80.0000003,132.1700001 83.4100003,134.5500001 a 8,8 0 0 0 9.18,0 c 3.41,-2.38 83.4099997,-59.2500001 83.4099997,-134.5500001 a 88.1,88.1 0 0 0 -87.99999967,-88 z m 0,56 a 32,32 0 1 1 -32.00000033,32 32,32 0 0 1 32.00000033,-32 z";

interface coordinate extends google.maps.LatLngLiteral {
  id: number;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

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
      featureType: "poi", // Hide points of interest labels
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.park", // Enables labels for parks
      elementType: "labels",
      stylers: [{ visibility: "on" }],
    },
  ],
};

const testCoordinates: coordinate[] = [
  {
    id: 1,
    lat: 37.72145834654513,
    lng: -122.47828226733533,
  },
  {
    id: 2,
    lat: 37.76882261237542,
    lng: -122.46731071747753,
  },
  {
    id: 3,
    lat: 37.72212295611043,
    lng: -122.47859151267485,
  },
  {
    id: 4,
    lat: 37.740810098737626,
    lng: -122.50549875122867,
  },
];

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
  });

  const { locations, selectedLocation } = useContext(SearchContext);

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {

    // // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center)
    // map.fitBounds(bounds)

    // When a user clicks on a listing/place move the map's camera to center on that location
    // const newCoords = {lat: listing.lat, lng: listing.lng};
    // map.panTo(newCoords);

    setMap(map);
  }, []);

  // If a location has been selected, pan to that location
  useEffect(() => {
    if (map && selectedLocation) {
      map.panTo({
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
      });
    }
  }, [map, selectedLocation]); // Trigger on coordinates change

  useEffect(() => {
    const strings = locations.map((location) => renderToString(<MarkerIcon size={32} />));
    console.log(strings);
  }, [locations]);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

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
      {/* <InfoWindow>
        <div>{selectedLocation?.name}</div>
      </InfoWindow> */}
      {locations.map((location) => (
        <Marker 
          key={location.id} 
          position={{ lat: location.latitude, lng: location.longitude }}
          icon={{
            path: mapPinFilledEdited,
            fillColor: "#d1daaf",
            fillOpacity: 1.0,
            scale: 0.15,
            strokeColor: "#869747",
            strokeWeight: 4,
            anchor: new google.maps.Point(0, 0)
          }}
          />
      ))}
    </GoogleMap>
  ) : (
    <div className="bg-slate-500 flex align-center justify-center">
      <div>Map is loading...</div>
    </div>
  );
}

export default memo(Map);
