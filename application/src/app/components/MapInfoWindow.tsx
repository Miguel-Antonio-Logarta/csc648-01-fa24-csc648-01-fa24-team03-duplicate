import { InfoWindow } from "@react-google-maps/api";
import Image from "next/image";
import { formatCategory } from '../utils/utils';
import Rating from "./Rating";
import { LocationData } from "../api/locations/route";
import X from "./icons/X";

type MapInfoWindowProps = {
  location: LocationData
}

const infoWindowOptions: google.maps.InfoWindowOptions = {
  maxWidth: 300,
  headerDisabled: true,
};

const MapInfoWindow = ({ location }: MapInfoWindowProps) => {
  return (
    <InfoWindow options={infoWindowOptions}>
        
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
      </InfoWindow>
  );
};

export default MapInfoWindow;