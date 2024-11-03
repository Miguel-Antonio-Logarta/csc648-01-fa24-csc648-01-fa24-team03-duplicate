// pages/homepage.tsx
"use client";
import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="p-4">

      <img
        src="/imgs/csBackground.png"
        alt="CoffeeSpot Header"
        className="mb-4"
        style={{
          width: '100%',
          height: '650px',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />


      <div className="p-4">
        <img src="/imgs/featuredSpotsimg.png"
          alt="FeaturedSpotsLogo"
          style={{
            width: '400px',
            height: '100%',
            objectPosition: 'center',
          }} />
      </div>

    </div>
  );
};

export default HomePage;