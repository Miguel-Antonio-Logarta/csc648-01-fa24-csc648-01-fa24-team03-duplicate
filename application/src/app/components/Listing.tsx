"use client";

import Image from "next/image";
import { LocationData } from "../api/locations/route";
import Wifi from "./icons/Wifi";
import ChargingAvailable from "./icons/ChargingAvailable";
import Pets from "./icons/Pets";
import Rating from "./Rating";
import { formatCategory, getBusynessStatus, getCategoryColors } from "../utils/utils";
import Link from "next/link";
import ListingControls from "./ListingControls";
import clsx from "clsx";
import { useState } from "react";

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
      // cafe bg color
      "bg-tea-green hover:bg-olivine": data.category === "CAFE",
      //fix library bg color
      "bg-lavender-blush hover:bg-cherry-blossom-pink": data.category === "LIBRARY",
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
    //fix props
    "bg-cherry-blossom-pink": data.category === "LIBRARY",
    "bg-gray": data.category === "PARK",
  })

  const bgColors = clsx(selectColors(data, false));

  const [themeColors, setThemeColors] = useState(getCategoryColors(data.category))

  return (
    <Link href={`/locationInfo/${data.id}`} target="_blank" className={`flex flex-col shadow-md rounded-lg border-4 ${themeColors.background} ${themeColors.hover} ${themeColors.border}`}>
      <div
        className="flex flex-row no-wrap gap-6 cursor-pointer p-6"
      >
        <div className="flex items-center">
          <div className="relative w-[150px] h-[150px] self-start">
            <Image
              className="object-cover rounded-lg bg-slate"
              alt={data.name}
              fill={true}
              src={data.imageWebLink}
            />
          </div>
        </div>
        <div className="flex flex-col grow">
          <div className="font-shantell text-xl mb-2 font-medium">{data.name}</div>
          <div className="font-josefin text-sm mb-3 flex flex-row items-center gap-2">
            <div className={`font-bold px-2 rounded-sm py-[4px] ${themeColors.categoryBackground}`}>
              {formatCategory(data.category)}
            </div>

            {/* should list average busyness here using busynessStatus not hardcoded. */}
            <span>•</span>
            <span className="text-base">Busyness: {getBusynessStatus(data.busynessStatus)} ({data.busynessStatus})</span>
          </div>
          <Rating
            className="mb-2"
            rating={data.rating}
            size={20}
            style="full"
          />
          <div className="flex flex-row gap-3">
            {data.hasWifi && (
              <div className="text-sm rounded-lg flex flex-row gap-2">
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
              <div className=" text-sm rounded-lg flex flex-row gap-2">
                <Pets size={16} />
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
