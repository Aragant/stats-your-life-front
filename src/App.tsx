import "./App.css";

import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/login";
import { useEffect } from "react";

function App() {
    const { status, authenticate } = useAuth();

    useEffect(() => {
        authenticate();
    }, []);

    if (status === "Unknown") {
        return (
            <div className="flex justify-center items-center min-h-screen bg-primary">
                <div
                    className="h-12 w-12 border-4 border-primary-3 border-t-transparent rounded-full animate-spin"
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (status === "Guest") {
        return (
            <>
                <Login />
            </>
        );
    }

    return <RouterProvider router={router} />;
}

export default App;
