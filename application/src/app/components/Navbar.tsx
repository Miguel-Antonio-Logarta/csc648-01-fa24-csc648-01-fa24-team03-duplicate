import Image from "next/image";
import MagnifyingGlass from "./icons/MagnifyingGlass";
import UserCircle from "./icons/UserCircle";

// When the user is not logged, it should show login and sign up buttons
// When the user is logged in, it should show the user's profile picture (clickable)
// If the user does not have a profile picture, use the default profile picture.

const Navbar = () => {

    return (
        <nav className="z-50 flex h-20 px-8 no-wrap items-stretch min-w-full shadow-md justify-between">
            <div className="flex items-stretch gap-x-4">
                <Image src={"/logo/Catffeine.png"} alt="Catffeine. Our mascot." width={80} height={64} className="object-contain mr-4"/>
                <div className="font-shantell flex items-stretch py-5">

                    {/* Turn into a client component. Search bar makes a query */}
                    <div className="flex items-stretch shadow-md bg-white px-6 rounded-full border-2 border-transparent hover:border-2 hover:border-slate-400">
                        <input className="min-w-0 max-w-96 outline-none" placeholder="Cafes, libraries, parks..." />
                        <MagnifyingGlass className="my-auto ml-4" size={20} />
                    </div>
                </div>
            </div>

            <div className="flex no-wrap items-stretch gap-x-4">
                <ul className="font-josefin flex no-wrap gap-x-4 mx-6">
                    <li className="flex items-center capitalize">Help</li>
                    <li className="flex items-center capitalize">About Us</li>
                    <li className="flex items-center capitalize">Contact</li>
                </ul>

                {/* Server component by default. However, if token is valid, or user is logged in, serve a client component that shoes the image or something */}
                <div className="flex no-wrap items-center">
                    <UserCircle size={32} />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;