import React from 'react';
import Image from 'next/image';
import HomeImg from './home_img.png';
import LogoImg from './logo.png';
import FeaturedSpots from './featured_spots.png';
import LocationCard from '../components/LocationCard';
import Navbar from '../components/Navbar';

const locations = [
  {
    title: "J. Paul Lenard Library",
    subtitle: "University Library",
    rating: 2.5,
    backgroundColor: "bg-rose-100",
    borderColor: "border-rose-300",
    imageUrl: " "
  },
  {
    title: "Marigold Cafe",
    subtitle: "University Library",
    rating: 2.5,
    backgroundColor: "bg-sage",
    borderColor: "border-darkSage",
    imageUrl: " "
  },
  {
    title: "New test cafe",
    subtitle: "test",
    rating: 2.5,
    backgroundColor: "bg-sage",
    borderColor: "border-darkSage",
    imageUrl: " "
  },
  {
    title: "Another test",
    subtitle: "testing",
    rating: 2.5,
    backgroundColor: "bg-rose-100",
    borderColor: "border-rose-300",
    imageUrl: " "
  }
];

const HomePage = () => {
  return (
    <main className="flex overflow-hidden flex-col bg-white">
      <header className="flex relative z-10 flex-col pb-6 w-full text-base min-h-[488px] text-zinc-800 max-md:max-w-full">
        <Image 
          loading="lazy" 
          src={HomeImg} 
          alt="Background header image" 
          className="object-cover absolute inset-0 size-full z-0" 
        />
        <Navbar />
        {/* temporary buttons */}
        <a href='login' className="justify-items-end max-w-20 z-20 px-4 py-1.5 m-1 text-sm font-bold text-center text-white shadow-sm bg-sage rounded-[35px]">
              Log In!
            </a>
        <a href='signup' className="justify-items-end max-w-24 z-20 px-3.5 py-1.5 text-sm font-bold text-center text-white bg-lightBlue shadow-sm rounded-[35px]">
          Sign Up!
        </a>
        <Image 
          loading="lazy" 
          src={LogoImg} 
          alt="Decorative element" 
          className="object-contain self-end mt-60 max-w-full aspect-[1.92] w-[272px] max-md:mt-10 max-md:mr-2 z-20" 
        />
      
      </header>
      <section className="flex flex-col items-center px-16 pt-4 w-full bg-stone-50 max-md:px-5 max-md:max-w-full">
        <Image 
          loading="lazy" 
          src={FeaturedSpots} 
          alt="Section header" 
          className="object-contain self-start max-w-full aspect-[3.58] w-[444px]" 
        />
        <div className="mt-2.5 w-full max-w-[1240px] max-md:max-w-full">
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            {locations.map((location, index) => (
              <div key={index} className="flex flex-col">
                <LocationCard {...location} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;