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
}

export default function Home() {

  const { locations, loading, error } = useGetLocationData();
  const {count, setCount} = useCount({startingVal: 0});

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Navbar />
      <div>{count} <button onClick={() => setCount(count + 1)}>Click me</button></div>
      <div className="flex flex-row no-wrap relative shadow-inner w-screen h-96 bg-red-200 items-center">
        {/* <div className="h-full w-full bg-blue-200"> */}
        <div className="flex flex-row no-wrap items-center z-10 px-32 gap-8">
          <Image
            loading="lazy"
            src="/logo/CoffeeSpotCropped.png"
            alt="Coffee Spot Logo"
            width={500}
            height={500}
          />
          <div className="font-shantell font-bold text-white text-4xl stroke-1 stroke-[#243c5a]">
            Find places to study and hang out!
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

      <section className="flex flex-col items-center px-16 py-2.5 w-full bg-stone-50 max-md:px-5 max-md:max-w-full">
        <Image
          loading="lazy"
          src="/featuredSpots.png"
          alt="Featured Spots"
          width={500}
          height={200}
          className="h-auto mb-2.5"
        />
        {/* <div className="w-full">
          {locations.map((location) => )}
        </div> */}
        <div className="mt-2.5 w-full max-w-[1240px] max-md:max-w-full">
          <div className="grid justify-center grid-cols-2 gap-5 max-md:grid-cols-1">
            {locations.map((location: Location) => (
              <div key={location.id} className="flex flex-col">
                <LocationCard
                  id={location.id}
                  title={location.name}
                  subtitle={location.category}
                  rating={location.rating}
                  imageUrl={location.imageWebLink}
                  backgroundColor="bg-sage"
                  borderColor="border-darkSage"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center my-8 p-16 p-2.5 w-full text-center border-slate-200 border-t-2">
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
      </section>
    </div>
  );
}
