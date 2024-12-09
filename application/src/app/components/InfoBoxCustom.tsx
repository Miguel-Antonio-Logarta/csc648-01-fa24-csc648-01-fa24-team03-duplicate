"use client"

import { InfoBox } from '@react-google-maps/api';
import { LocationData } from '../api/locations/route';
import { useEffect, useState } from 'react';

import styles from './components.module.css';
import { LocationType } from '@prisma/client';
import { formatCategory, getBusynessStatus, getCategoryColors } from '../utils/utils';
import Rating from './Rating';
import Image from 'next/image';
import Wifi from './icons/Wifi';
import Pets from './icons/Pets';
import Link from 'next/link';
import X from './icons/X';

type MapInfoBoxProps = {
  location: LocationData;
  anchor: google.maps.Marker;
  handleClose: (_: any) => void; 
};

const getTriangleColors = (category: LocationType): string => {
  // ::Before is the border color, ::after is the background color
  if (category == 'CAFE') {
    // return 'before:bg-tea-green after:bg-olivine '; 
    return 'before:border-t-[20px] after:border-t-[16px] before:border-t-olivine after:border-t-tea-green' // #BBC887 #D1DAAF'
  } else if (category == 'LIBRARY') {
    return 'before:border-t-[20px] after:border-t-[16px] before:border-t-cherry-blossom-pink after:border-t-lavender-blush '; // #F4A4B1 #FFE7EC 
  } else if (category == 'PARK') {
    return 'before:border-t-[20px] after:border-t-[16px] before:border-t-jordy-blue after:border-t-columbia-blue '; // #85C0FF #C6E2FF 
  } else {
    return 'before:border-t-[20px] after:border-t-[16px] before:border-t-black after:border-t-white ';
  }
}

const MapInfoBox = (props: MapInfoBoxProps) => {
  const [theme, setTheme] = useState(() => getCategoryColors(props.location.category));

  useEffect(() => console.log(props.anchor));
  
  return (
    <InfoBox
      anchor={props.anchor}
      options={{
        isHidden: false,
        pixelOffset: new google.maps.Size(-150, -60),
        boxStyle: {
          overflow: 'visible',
        },
        closeBoxURL: '',
        alignBottom: true,
      }}
    >
      <div className={`${styles["map-infobox"]} ${getTriangleColors(props.location.category)} ${theme.background} ${theme.border} relative w-[300px] rounded-lg flex shadow-md border-4 flex flex-col p-4 text-umber`}>
        <div className="absolute top-0 right-0 pt-2 pr-2 ">
              <button onClick={props.handleClose}>
                <X className="text-red-300" size={24} fill="rgb(115 115 115)" />
              </button>
          </div>
        <div className='text-xl font-shantell font-medium mb-2 line-clamp-2'>{props.location.name}</div>
          <div className="font-josefin text-sm mb-3 flex flex-row items-center gap-2">
            <div className={`font-bold px-2 rounded-sm py-[4px] ${theme.categoryBackground}`}>
              {formatCategory(props.location.category)}
            </div>
            <span>•</span>
            <span className="text-base">{getBusynessStatus(props.location.busynessStatus)}</span>
          </div>
        <div className="relative w-full h-[100px] mb-4">
            {/* Add a placeholder image for when it is loading... */}
            <Image
              className="object-cover rounded-lg bg-slate"
              alt={props.location.name}
              fill={true}
              src={props.location.imageWebLink}
            />
          </div>
        <Rating
            className="text-umber mb-4"
            rating={props.location.rating}
            size={30}
            fontSize={24}
            fill='#715E50'
            style="full2"
          />
          <div className='flex gap-2'>
            {props.location.hasWifi && 
              <span className="align-middle inline-block">
                <Wifi size={30} fill={"#715E50"}/>
              </span>
            }
            {props.location.animalFriendliness && 
              <span className="align-middle inline-block">
                <Pets size={30} fill={"#715E50"}/>
              </span>
            }
          </div>
          <div className='flex items-center align-center justify-center'>
            <div className='my-4'>
              <Link className="bg-columbia-blue border-columbia-blue text-white font-medium text-lg border-2 px-4 py-2 shadow-md rounded-full hover:bg-jordy-blue hover:border-jordy-blue font-shantell" 
                href={`/locationInfo/${props.location.id}`} 
                target="_">Learn More!
              </Link>
            </div>
          </div>
      </div>
    </InfoBox>
  );
};

export default MapInfoBox;
