import AdminNavbar from "../components/AdminNavbar";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="min-h-screen max-w-full grid grid-rows-[auto_1fr]">
            <AdminNavbar />
            {children}
        </div>
    );
}

export default Layout;