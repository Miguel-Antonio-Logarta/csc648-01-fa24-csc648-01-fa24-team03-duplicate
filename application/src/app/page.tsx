"use client";

import Link from "next/link";
import styles from "./page.module.css";
import componentStyles from "./components.module.css";
import Navbar from "./components/Navbar";
import useGetLocationData from "./hooks/useGetLocationData";
import Image from "next/image";
import LocationCard from "./components/LocationCard";
import useCount from "./hooks/counthook";

interface Location {
  id: string;
  name: string;
  category: string;
  rating: number;
  imageWebLink: string;
  hasWifi: boolean;
  animalFriendliness: boolean;
}

export default function Home() {

  const { locations } = useGetLocationData();

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-row no-wrap relative shadow-inner w-screen h-96 items-center justify-center">
        {/* <div className="h-full w-full bg-blue-200"> */}
        <div className="flex flex-col items-center z-10 px-32 gap-8">
          <Image
            className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
            loading="lazy"
            src="/logo/CoffeeSpotCropped.png"
            alt="Coffee Spot Logo"
            width={500}
            height={500}
          />
          <div className="font-shantell font-bold text-white text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Find spots to work productively!
          </div>
        </div>

        {/* <div className="relative h-full w-full top-0 left-0"> */}
        <Image
          loading="lazy"
          src="/landingImage.png"
          alt="Welcome to Coffee Spot"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <section className="flex flex-col items-center px-16 pt-2.5 pb-5 w-full bg-stone-50 max-md:px-5 max-md:max-w-full">
        <Image
          loading="lazy"
          src="/featuredSpots.png"
          alt="Featured Spots"
          width={500}
          height={200}
          className="justify-self-start mb-2.5"
        />
        <div className="mt-2.5 w-full max-w-[1240px] max-md:max-w-full">
          <div className="grid justify-center grid-cols-2 gap-5 max-md:grid-cols-1">
            {locations.map((location: Location) => (
              <div key={location.id} className="flex flex-col">
                <LocationCard
                  id={location.id}
                  name={location.name}
                  rating={location.rating}
                  imageUrl={location.imageWebLink}
                  category={location.category}
                  hasWifi={location.hasWifi}
                  animalFriendliness={location.animalFriendliness}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <section className="flex flex-col items-center my-8 p-16 p-2.5 w-full text-center border-slate-200 border-t-2">
        <h1>Check Out the Other Pages!</h1>
        <div className="flex flex-col gap-5 w-96">
          <Link href="prototype" className={componentStyles.button}>
            See our vertical prototype! →
          </Link>
          <Link href="search" className={componentStyles.button}>
            Go to search page →
          </Link>
          <Link href="about" className={`${componentStyles.button}`}>
            See our about page →
          </Link>
        </div>
      </section> */}
    </div>
  );
}
