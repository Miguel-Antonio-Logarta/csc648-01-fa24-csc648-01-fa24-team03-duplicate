import Navbar from "../components/Navbar";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <body className="min-h-screen max-w-full">
            <Navbar />
            {children}
        </body>
    );
}

export default Layout;