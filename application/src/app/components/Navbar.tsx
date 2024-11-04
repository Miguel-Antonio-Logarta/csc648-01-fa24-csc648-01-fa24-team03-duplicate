"use client"

import Image from "next/image";
import UserCircle from "./icons/UserCircle";
import { Suspense, useState } from "react";
import Link from "next/link";
import NavSearch from "./NavSearch";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";

const Navbar = () => {
    const { data: session, status } = useSession();
    //const [loggedIn, setLoggedIn] = useState(false);

    return (
        <nav className="z-50 flex h-20 px-8 no-wrap items-stretch min-w-full shadow-md justify-between">
            <div className="flex items-stretch gap-x-4">
                <Link href={"/"} passHref>
                    <Image src={"/logo/Catffeine.png"} alt="Our mascot Catffeine" width={80} height={64} className="object-contain mr-4 h-auto" />
                </Link>
                <div className="font-shantell flex items-stretch py-5">
                    <Suspense fallback={<p>Searchbar is loading...</p>}>
                        <NavSearch />
                    </Suspense>
                </div>
            </div>

            <div className="flex no-wrap items-stretch gap-x-4">
                <ul className="font-josefin flex no-wrap gap-x-4 mx-6">
                    <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/help"}>Help</Link></li>
                    <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/about"}>About</Link></li>
                    <li><Link className="flex items-center capitalize w-full h-full align-middle hover:underline" href={"/contact"}>Contact</Link></li>
                </ul>
                {session ? (
                    <div className="flex no-wrap items-center gap-5">
                        <UserCircle size={32} />
                        <LogoutButton />
                    </div>
                ) : (
                    <div className="flex no-wrap items-center gap-5">
                        <Link href="/login" className="bg-[#D1DAAF] border-[#D1DAAF] border-2 font-josefin px-4 py-2 shadow-md rounded-full hover:bg-white">
                            Log in
                        </Link>
                        <Link href="/signup" className="bg-[#C6E2FF] border-[#C6E2FF] border-2 font-josefin px-4 py-2 shadow-md rounded-full hover:bg-white">
                            Sign up
                        </Link>
                    </div>
                )}
            </div>
        </nav >
    );
}

export default Navbar;