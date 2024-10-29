import AdminNavbar from "../components/AdminNavbar";
import { Toaster } from 'react-hot-toast';

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="min-h-screen max-w-full grid grid-rows-[auto_1fr]">
            <AdminNavbar />
            <Toaster />
            {children}
        </div>
    );
}

export default Layout;