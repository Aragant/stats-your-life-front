import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

export default function RootLayout() {
    return (
        <>
            <div className="min-h-screen min-w-screen flex flex-col items-stretch text-font">
                <div className="flex-1 flex flex-col">
                    <Outlet />
                </div>
                <Navbar />
            </div>
        </>
    );
}
