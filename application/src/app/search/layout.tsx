import Navbar from "../components/Navbar";
import LocationProvider from "../context/LocationContext";
// import SearchProvider from "../context/SearchContext";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="min-h-screen max-w-full grid grid-rows-[auto_1fr]">
            <Navbar />
            <LocationProvider>
                {children}
            </LocationProvider>
        </div>
    );
}

export default Layout;