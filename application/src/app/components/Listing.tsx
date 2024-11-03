"use client"

import Image from "next/image"
import { LocationData } from "../api/locations/route"
import Wifi from "./icons/Wifi"
import ChargingAvailable from "./icons/ChargingAvailable"
import Pets from "./icons/Pets"
import Rating from "./Rating"
import { formatCategory } from "../utils/utils"

type props = {
  data: LocationData
}

/*
* TODO:
*   - Add review counter
*   - Add "charging available" feature
*/
function Listing({ data }: props) {
  return (
    <div className="flex flex-row no-wrap bg-white shadow-md rounded-md p-6 gap-6 cursor-pointer">
        <div className="flex items-center">
          <div className="relative w-[150px] h-[150px] self-middle">
            {/* Add a placeholder image for when it is loading... */}
            <Image className="object-cover rounded-lg bg-slate" alt={data.name} fill={true} src={data.imageWebLink}/>
          </div>
        </div>
        <div className="flex flex-col grow">
          <div className="font-shantell text-xl mb-2">{data.name}</div>
          <div className="font-josefin text-sm mb-3 flex flex-row items-center gap-2">
            <div className="bg-slate-200 font-bold px-2 rounded-sm py-[4px]">{formatCategory(data.category)}</div> 
            <span>•</span> 
            <span className="text-base">Currently busy</span>
          </div>
          <Rating className="mb-2" rating={data.rating} size={20} />
          <div className="flex flex-row gap-3">
            {data.hasWifi && <div className="text-sm rounded-lg flex flex-row gap-1"><Wifi size={16} />Wifi available</div>}
            {data.hasWifi && <div className="text-sm rounded-lg flex flex-row gap-1"><ChargingAvailable size={16} />Charging available</div>}
            {data.animalFriendliness && <div className=" text-xs font-bold rounded-lg flex flex-row gap-2 items-center p-2 align-middle"><Pets size={14} />Pets allowed</div>}
          </div>
        </div>
    </div>
  )
}

export default Listing