import { InfoWindow, Marker } from '@react-google-maps/api';
import { LocationData } from '../api/locations/route';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import X from './icons/X';
import Rating from './Rating';
import { formatCategory } from '../utils/utils';
import { LocationType } from '@prisma/client';

type MapMarkerStyle = "default" | "bold" | "filled";

type MapMarkerProps = {
  location: LocationData;
  selectedMarkerId: number | undefined;
  setSelectedMarkerId: (_: number) => void;
  style: MapMarkerStyle;
};

// Different map pin styles
const mapPinEdited =
  'M 5.0659545e-8,-176.125 A 40,40 0 1 0 40,-136.125 40,40 0 0 0 5.0659545e-8,-176.125 Z m 0,64 A 24,24 0 1 1 24,-136.125 24,24 0 0 1 5.0659545e-8,-112.125 Z m 0,-112 A 88.1,88.1 0 0 0 -88,-136.125 c 0,31.4 14.51,64.68 42,96.25 a 254.19,254.19 0 0 0 41.4500001,38.3 8,8 0 0 0 9.18,0 A 254.19,254.19 0 0 0 46,-39.875 c 27.45,-31.57 42,-64.85 42,-96.25 A 88.1,88.1 0 0 0 5.0659545e-8,-224.125 Z m 0,206 C -16.53,-31.125 -72,-78.875 -72,-136.125 a 72,72 0 0 1 144,0 c 0,57.23 -55.47,105 -71.999999949340448,118 z';
const mapPinBoldEdited =
  'M 5.0263818e-7,-184.5 A 44,44 0 1 0 44,-140.5 44.05,44.05 0 0 0 5.0263818e-7,-184.5 Z m 0,64 A 20,20 0 1 1 20,-140.5 20,20 0 0 1 5.0263818e-7,-120.5 Z m 0,-112 A 92.1,92.1 0 0 0 -92,-140.5 c 0,77.360001 81.640001,135.4000009 85.1200005,137.8300009 a 12,12 0 0 0 13.76,0 A 259,259 0 0 0 49.06,-41.669999 C 77.15,-73.929999 92,-108.13 92,-140.5 A 92.1,92.1 0 0 0 5.0263818e-7,-232.5 Z M 31.3,-57.789999 A 249.35,249.35 0 0 1 5.0263818e-7,-27.609999 249.35,249.35 0 0 1 -31.3,-57.789999 C -48,-77.129999 -68,-107.19 -68,-140.5 a 68,68 0 0 1 136,0 c 0,33.31 -20,63.370001 -36.7,82.710001 z';
const mapPinFilledEdited =
  'm -0.00506667,-224.2533 a 88.1,88.1 0 0 0 -88.00000033,88 c 0,75.3 80.0000003,132.1700001 83.4100003,134.5500001 a 8,8 0 0 0 9.18,0 c 3.41,-2.38 83.4099997,-59.2500001 83.4099997,-134.5500001 a 88.1,88.1 0 0 0 -87.99999967,-88 z m 0,56 a 32,32 0 1 1 -32.00000033,32 32,32 0 0 1 32.00000033,-32 z';

const infoWindowOptions: google.maps.InfoWindowOptions = {
  maxWidth: 300,
  headerDisabled: true,
};

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

const MapMarker = ({ location, selectedMarkerId, setSelectedMarkerId, style }: MapMarkerProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const [hoveringInfoWindow, setHoveringInfoWindow] = useState(false);

  useEffect(() => {
    console.log("I've been rerendered");
  });

  /*
    When the user hovers over the marker, it will reveal the infowindow
    When the user leaves the area, the infowindow closes
  */
  {
    /* V1: There are manual open and close actions */
  }
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
      onClick={() => setSelectedMarkerId(location.id)}
    >
      {/* Style 2: Imgae on the side */}
      {/* Style 1: Image on the top */}
      {selectedMarkerId === location.id && <InfoWindow options={infoWindowOptions}>
        
        <div
          className="flex flex-col items-center w-[300px] h-full p-3 relative rounded-lg border-4 border-[#0000FF]"
        >
          <div className="absolute top-0 right-0 pt-4 pr-4 ">
              <button onClick={close} className="p-2">
                <X className="text-red-300" size={24} fill="rgb(115 115 115)" />
              </button>
          </div>
          <div className="relative w-full h-[150px]">
            <Image
              className="object-cover rounded-lg bg-slate"
              alt={location.name}
              fill={true}
              src={location.imageWebLink}
            />
          </div>
          <p className="font-shantell text-lg mb-2 text-left mt-2">
            {location.name}
          </p>
          <div>
          <div className="font-josefin text-sm mb-3 flex flex-row items-center gap-2">
            <div className={`font-bold px-2 rounded-sm py-[4px] bg-cherry-blossom-pink`}>
              {formatCategory(location.category)}
            </div>
            <span>•</span>
            <span className="text-base">Currently busy</span>
          </div>
            <Rating 
            rating={location.rating}
              style='full'
              size={24}
            />
          </div>
        </div>
      </InfoWindow>}
    </Marker>
  );

  {
    /* V2: InfoWindow closes and opens based on hover actions*/
  }
  return (
    <Marker
      key={location.id}
      position={{ lat: location.latitude, lng: location.longitude }}
      icon={{
        path: mapPinFilledEdited,
        fillColor: '#d1daaf',
        fillOpacity: 1.0,
        scale: 0.15,
        strokeColor: '#869747',
        strokeWeight: 4,
        anchor: new google.maps.Point(0, 0),
      }}
      onMouseOver={() => setShowInfo(true)}
      onMouseOut={() =>
        setTimeout(() => {
          if (!hoveringInfoWindow) {
            setShowInfo(false);
          }
        }, 300)
      }
    >
      {showInfo && (
        <InfoWindow options={infoWindowOptions}>
          <div
            className="flex flex-col items-center w-full h-full"
            onMouseEnter={() => {
              setHoveringInfoWindow(true);
            }}
            onMouseLeave={() => {
              // setShowInfo(false);
              setHoveringInfoWindow(false);
            }}
          >
            <div className="relative w-full h-[150px]">
              <Image
                className="object-cover rounded-lg bg-slate"
                alt={location.name}
                fill={true}
                src={location.imageWebLink}
              />
            </div>
            <div className="font-shantell text-lg mb-2 text-center mt-2">
              {location.name}
            </div>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

export default MapMarker;
