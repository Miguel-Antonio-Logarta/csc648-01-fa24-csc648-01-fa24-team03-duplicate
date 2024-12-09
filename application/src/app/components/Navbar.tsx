"use client";

import Image from 'next/image';
import Link from 'next/link';
import NavSearch from './NavSearch';
import NavbarUser from './NavbarUser';
import { Suspense, useState } from 'react';

const Navbar = () => {
  const [imageSrc, setImageSrc] = useState('/logo/Catffeine.png');

  const handleMouseEnter = () => {
    setImageSrc('/logo/Catffeine2.png');
  };

  const handleMouseLeave = () => {
    setImageSrc('/logo/Catffeine.png');
  };

  return (
    <nav className="z-50 flex h-20 px-8 no-wrap items-stretch min-w-full shadow-md justify-between">
      <div className="flex items-stretch gap-x-4">
        <Link href={'/'} passHref>
          <Image
            src={imageSrc}
            alt="Our mascot Catffeine"
            width={80}
            height={64}
            className="object-contain mr-4 h-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Link>
        <div className="font-shantell flex items-stretch py-5">
          <Suspense fallback={<div>Searchbar is loading...</div>}>
            <NavSearch />
          </Suspense>
        </div>
      </div>
      <NavbarUser />
    </nav>
  );
};

export default Navbar;