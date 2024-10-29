import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const AdminNavbar = () => {

    return (
        <nav className="z-50 flex h-20 px-8 no-wrap items-stretch min-w-full shadow-md justify-between">
            <div className="flex items-stretch gap-x-4">
                <Link href={"/"} passHref>
                    <Image src={"/logo/Catffeine.png"} alt="Our mascot Catffeine" width={80} height={64} className="object-contain mr-4 h-auto"/>
                </Link>
            </div>

            <div>
                <LogoutButton />
            </div>
        </nav>
    );
};

export default AdminNavbar;