import { InfoBox, InfoWindow, Marker } from '@react-google-maps/api';
import { LocationData } from '../api/locations/route';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import X from './icons/X';
import Rating from './Rating';
import { formatCategory } from '../utils/utils';
import { LocationType } from '@prisma/client';
import MapInfoWindow from './MapInfoWindow';
import InfoBoxCustom from './InfoBoxCustom';

type MapMarkerStyle = "default" | "bold" | "filled";

type MapMarkerProps = {
  location: LocationData;
  selectedMarkerId: number | undefined;
  setSelectedMarkerId: (_: number) => void;
  setSelectedLocation: (_: LocationData) => void;
  style: MapMarkerStyle;
  setAnchorRef?: (marker: google.maps.Marker) => void;
};

// Different map pin styles
const mapPinEdited =
  'M 5.0659545e-8,-176.125 A 40,40 0 1 0 40,-136.125 40,40 0 0 0 5.0659545e-8,-176.125 Z m 0,64 A 24,24 0 1 1 24,-136.125 24,24 0 0 1 5.0659545e-8,-112.125 Z m 0,-112 A 88.1,88.1 0 0 0 -88,-136.125 c 0,31.4 14.51,64.68 42,96.25 a 254.19,254.19 0 0 0 41.4500001,38.3 8,8 0 0 0 9.18,0 A 254.19,254.19 0 0 0 46,-39.875 c 27.45,-31.57 42,-64.85 42,-96.25 A 88.1,88.1 0 0 0 5.0659545e-8,-224.125 Z m 0,206 C -16.53,-31.125 -72,-78.875 -72,-136.125 a 72,72 0 0 1 144,0 c 0,57.23 -55.47,105 -71.999999949340448,118 z';
const mapPinBoldEdited =
  'M 5.0263818e-7,-184.5 A 44,44 0 1 0 44,-140.5 44.05,44.05 0 0 0 5.0263818e-7,-184.5 Z m 0,64 A 20,20 0 1 1 20,-140.5 20,20 0 0 1 5.0263818e-7,-120.5 Z m 0,-112 A 92.1,92.1 0 0 0 -92,-140.5 c 0,77.360001 81.640001,135.4000009 85.1200005,137.8300009 a 12,12 0 0 0 13.76,0 A 259,259 0 0 0 49.06,-41.669999 C 77.15,-73.929999 92,-108.13 92,-140.5 A 92.1,92.1 0 0 0 5.0263818e-7,-232.5 Z M 31.3,-57.789999 A 249.35,249.35 0 0 1 5.0263818e-7,-27.609999 249.35,249.35 0 0 1 -31.3,-57.789999 C -48,-77.129999 -68,-107.19 -68,-140.5 a 68,68 0 0 1 136,0 c 0,33.31 -20,63.370001 -36.7,82.710001 z';
const mapPinFilledEdited =
  'm -0.00506667,-224.2533 a 88.1,88.1 0 0 0 -88.00000033,88 c 0,75.3 80.0000003,132.1700001 83.4100003,134.5500001 a 8,8 0 0 0 9.18,0 c 3.41,-2.38 83.4099997,-59.2500001 83.4099997,-134.5500001 a 88.1,88.1 0 0 0 -87.99999967,-88 z m 0,56 a 32,32 0 1 1 -32.00000033,32 32,32 0 0 1 32.00000033,-32 z';

const getSvgPath = (style: MapMarkerStyle): string => {
  if (style == "default") {
    return mapPinEdited;
  } else if (style == "bold") {
    return mapPinBoldEdited;
  } else if (style == "filled") {
    return mapPinFilledEdited;
  } else {
    return "";
  }
}

const getFillColor = (category: LocationType): string => {
  if (category == "CAFE") {
    return "#D1DAAF"; // Tea green color
  } else if (category == "LIBRARY") {
    return "#FFE7EC" // Lavender blush color
  } else if (category == "PARK") {
    return "#C6E2FF" // Columbia blue color
  } else {
    return "#FFFFFF" // White
  }
}

const getStrokeColor = (category: LocationType): string => {
  if (category == "CAFE") {
    return "#BBC887" // Olivine color
  } else if (category == "LIBRARY") {
    return "#F4A4B1"  // Cherry blossom pink color
  } else if (category == "PARK") {
    return "#85C0FF" // Jordy blue color
  } else {
    return "#000000"  // Black color
  }
}

const MapMarker = ({ location, selectedMarkerId, setSelectedMarkerId, style, setAnchorRef, setSelectedLocation }: MapMarkerProps) => {
  const markerRef = useRef<google.maps.Marker | undefined>(undefined);
  
  useEffect(() => {
    console.log("I've been rerendered", location.id);
  });

  return (
    <Marker
      key={location.id}
      position={{ lat: location.latitude, lng: location.longitude }}
      icon={{
        path: getSvgPath(style),
        fillColor: getFillColor(location.category),
        fillOpacity: 1.0,
        scale: 0.15,
        strokeColor: getStrokeColor(location.category),
        strokeWeight: 4,
        anchor: new google.maps.Point(0, 0),
      }}
      onClick={() => {
        setSelectedMarkerId(location.id);
        setSelectedLocation(location);
      }}
      onLoad={(marker) => {
        markerRef.current = marker
        if (setAnchorRef) {
          setAnchorRef(marker);
        }
      }}
    >
      {selectedMarkerId === location.id && markerRef.current &&
        <InfoBoxCustom location={location} anchor={markerRef.current} />
      }
    </Marker>
  );
};

export default MapMarker;
