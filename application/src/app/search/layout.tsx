import Navbar from "../components/navbar";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="min-h-screen max-w-full grid grid-rows-[auto_1fr]">
            <Navbar />
            {children}
        </div>
    );
}

export default Layout;