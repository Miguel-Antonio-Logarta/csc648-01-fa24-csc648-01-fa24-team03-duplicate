import { useState, useCallback, memo, useContext, useEffect } from "react";
import { GoogleMap, InfoBox, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { SearchContext } from "../context/SearchContext";
import { renderToString } from "react-dom/server";
import MarkerIcon from "./icons/Marker";
import { LocationData } from "../api/locations/route";
import Image from "next/image";
import MapMarker from "./MapMarker";


type MapProps = {
  locations: LocationData[] | undefined;
}

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

function Map({ locations }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
  });

  // const { locations, selectedLocation, setSelectedLocation } = useContext(SearchContext);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | undefined>(undefined);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  useEffect(() => {
    console.log("Map has been rerendered");
  });

  // If a location has been selected, pan to that location
  useEffect(() => {
    if (map && selectedLocation) {
      map.panTo({
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
      });
      map.panBy(0, -200); // Offset by 200 px so that the infobox doesn't get cut off
    }
  }, [map, selectedLocation]); // Trigger on coordinates change

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (e: google.maps.MapMouseEvent, location: LocationData) => {
    setSelectedMarkerId(location.id);
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
    >
      {locations && locations.map((location) => 
        <MapMarker 
          key={location.id} 
          location={location} 
          selectedMarkerId={selectedMarkerId} 
          setSelectedMarkerId={setSelectedMarkerId} 
          setSelectedLocation={setSelectedLocation}
          style="filled" />
      )}
      {/* TODO: On click, scroll to the listing on the left */}
    </GoogleMap>
  ) : (
    <div className="bg-slate-500 flex align-center justify-center">
      <div>Map is loading...</div>
    </div>
  );
}

export default memo(Map);
