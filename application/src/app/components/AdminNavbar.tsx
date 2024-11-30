import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const AdminNavbar = () => {

    return (
        <nav className="z-50 flex h-20 px-8 no-wrap items-stretch min-w-full shadow-md justify-between">
            <div className="flex items-stretch gap-x-4">
                <Link href={"/"} passHref>
                    <Image src={"/logo/Catffeine.png"}
                        alt="Our mascot Catffeine"
                        width={80}
                        height={64}
                        className="object-contain mr-4 h-auto"
                    />
                </Link>

                <div className="flex no-wrap items-center gap-5 ml-4">
                    <Link href={"/admin"} className="bg-[#775df7] border-[#775df7] border-2 font-josefin px-4 py-2 shadow-md rounded-full hover:bg-white">
                        Dashboard
                    </Link>
                    <Link href={"/admin/createLocation"} className="bg-[#775df7] border-[#775df7] border-2 font-josefin px-4 py-2 shadow-md rounded-full hover:bg-white">
                        Create Location
                    </Link>
                    <Link href={"/admin/editLocation"} className="bg-[#775df7] border-[#775df7] border-2 font-josefin px-4 py-2 shadow-md rounded-full hover:bg-white">
                        Edit Location
                    </Link>
                    <Link href={"/admin/deleteLocation"} className="bg-[#775df7] border-[#775df7] border-2 font-josefin px-4 py-2 shadow-md rounded-full hover:bg-white">
                        Delete Location
                    </Link>
                </div>
            </div>

            <div className="flex items-center">
                <LogoutButton />
            </div>
        </nav>
    );
};

export default AdminNavbar;