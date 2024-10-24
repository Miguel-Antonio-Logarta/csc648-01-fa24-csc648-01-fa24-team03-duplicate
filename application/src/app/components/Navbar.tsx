import MagnifyingGlass from "./icons/MagnifyingGlass";
import UserCircle from "./icons/UserCircle";

const Navbar = () => {
    return (
        <nav className="z-50 flex h-16 px-8 no-wrap items-stretch min-w-full shadow-md justify-between">
            <div className="flex items-stretch gap-x-4">
                <div className="font-josefin uppercase text-xl flex items-center mr-4">Coffee Spot</div>
                <div className="font-shantell flex items-stretch py-3">
                    <div className="flex items-stretch shadow-md bg-white px-6 rounded-full border-2 border-transparent hover:border-2 hover:border-slate-400">
                        <input className="min-w-0 max-w-96 outline-none" placeholder="Cafes, libraries, parks..." />
                        <MagnifyingGlass className="my-auto ml-4" size={20} />
                    </div>
                </div>
                    {/* <div className="grid grid-cols-[1fr_auto] items-center shadow-md w-96 bg-white px-6 rounded-full">
                        <input className="grow-1" placeholder="Cafes, libraries, parks..." />
                        <MagnifyingGlass className="ml-4" size={20} />
                    </div> */}
            </div>

            <div className="flex no-wrap items-stretch gap-x-4">
                <ul className="font-josefin flex no-wrap gap-x-4 mx-6">
                    <li className="flex items-center capitalize">Help</li>
                    <li className="flex items-center capitalize">About Us</li>
                    <li className="flex items-center capitalize">Contact</li>
                </ul>
                <div className="flex no-wrap items-center">
                    <UserCircle size={32} />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;