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
    <div className="flex flex-row no-wrap bg-white shadow-md rounded-md p-6 gap-6">
        <div className="relative w-[150px] h-[150px] self-middle">
          {/* Add a placeholder image for when it is loading... */}
          <Image className="object-cover rounded-lg bg-slate" alt={data.name} fill={true} src={data.imageWebLink}/>
        </div>
        <div className="flex flex-col h-full w-full">
          <div className="font-shantell text-xl mb-2">{data.name}</div>
          <div className="font-josefin text-sm mb-1"><span>{formatCategory(data.category)}</span> • <span>Currently busy</span></div>
          <Rating rating={data.rating} size={16} />
          <div className="flex flex-row no-wrap gap-2 justify-self-end">
            {data.hasWifi && <div className="bg-slate-200 text-xs font-bold rounded-lg flex flex-row gap-2 items-center p-2 align-middle"><Wifi size={14} />Wifi available</div>}
            {data.hasWifi && <div className="bg-slate-200 text-xs font-bold rounded-lg flex flex-row gap-2 items-center p-2 align-middle"><ChargingAvailable size={14} />Charging available</div>}
            {data.animalFriendliness && <div className="bg-slate-200 text-xs font-bold rounded-lg flex flex-row gap-2 items-center p-2 align-middle"><Pets size={14} />Pets allowed</div>}
          </div>
        </div>
    </div>
  )
}

export default Listing