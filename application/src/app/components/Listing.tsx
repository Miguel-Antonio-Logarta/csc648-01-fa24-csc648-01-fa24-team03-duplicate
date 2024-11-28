"use client";

import Image from "next/image";
import { LocationData } from "../api/locations/route";
import Wifi from "./icons/Wifi";
import ChargingAvailable from "./icons/ChargingAvailable";
import Pets from "./icons/Pets";
import Rating from "./Rating";
import { formatCategory } from "../utils/utils";
import Link from "next/link";
import ListingControls from "./ListingControls";
import clsx from "clsx";

type props = {
  data: LocationData;
};

function selectColors(data: LocationData, isSelected: boolean) {
  const borderColors = {
    "border-olivine": data.category === "CAFE",
    "border-cherry-blossom-pink": data.category === "LIBRARY",
    "border-black": data.category === "PARK"
  }
  
  // If selection location is equal to the id, set it to be the active color instead of the default bg 
  // console.log("I am being called!", data.id, selectionLocationId)
  if (isSelected) {
    return {
      ...borderColors,
      "bg-olivine": data.category === "CAFE",
      "bg-cherry-blossom-pink": data.category === "LIBRARY",
      "bg-gray": data.category === "PARK"
    }
  } else {
    return {
      ...borderColors,
      "bg-tea-green-hover hover:bg-olivine": data.category === "CAFE",
      "bg-pink-hover hover:bg-cherry-blossom-pink": data.category === "LIBRARY",
      "bg-slate-200 hover:bg-gray": data.category === "PARK"
    }
  }
}

/*
 * TODO:
 *   - Add review counter
 *   - Add "charging available" feature
 */
function Listing({ data }: props) {

  const backgroundCategoryColors = clsx({
    "bg-olivine": data.category === "CAFE",
    "bg-cherry-blossom-pink": data.category === "LIBRARY",
    "bg-gray": data.category === "PARK",
  })

  const bgColors = clsx(selectColors(data, false));

  return (
    <Link href={`/locationInfo/${data.id}`} target="_blank" className={`flex flex-col shadow-md rounded-lg border-4 ${bgColors}`}>
      <div
        // onClick={() => selectLocation(data)}
        className="flex flex-row no-wrap gap-6 cursor-pointer p-6"
      >
        <div className="flex items-center">
          <div className="relative w-[150px] h-[150px] self-start">
            {/* Add a placeholder image for when it is loading... */}
            <Image
              className="object-cover rounded-lg bg-slate"
              alt={data.name}
              fill={true}
              src={data.imageWebLink}
            />
          </div>
        </div>
        <div className="flex flex-col grow">
          <div className="font-shantell text-xl mb-2">{data.name}</div>
          <div className="font-josefin text-sm mb-3 flex flex-row items-center gap-2">
            <div className={`font-bold px-2 rounded-sm py-[4px] ${backgroundCategoryColors}`}>
              {formatCategory(data.category)}
            </div>
            <span>•</span>
            <span className="text-base">Currently busy</span>
          </div>
          <Rating
            className="mb-2"
            rating={data.rating}
            size={20}
            style="full"
          />
          <div className="flex flex-row gap-3">
            {data.hasWifi && (
              <div className="text-sm rounded-lg flex flex-row gap-1">
                <Wifi size={16} />
                Wifi available
              </div>
            )}
            {/* {data.ch && (
              <div className="text-sm rounded-lg flex flex-row gap-1">
                <ChargingAvailable size={16} />
                Charging available
              </div>
            )} */}
            {data.animalFriendliness && (
              <div className=" text-xs font-bold rounded-lg flex flex-row gap-2 items-center p-2 align-middle">
                <Pets size={14} />
                Pets allowed
              </div>
            )}
          </div>
        </div>
      </div>
      <ListingControls data={data}/>
    </Link>
  );
}

export default Listing;
