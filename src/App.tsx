import "./App.css";

import { RouterProvider } from "react-router"; // ✅ ICI
import { router } from "./routes";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/login";
import { useEffect } from "react";

function App() {
    const {status, authenticate} = useAuth();
    
    useEffect(() => {
        authenticate();
    }, []);

    if (status === 'Unknown') {
        return (
            <div className="flex justify-center items-center my-5">
                <div
                    className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (status === 'Guest'){
        return (
            <>
                <Login />
            </>
        )
    }

    return <RouterProvider router={router} />;
}

export default App;
