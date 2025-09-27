import { createBrowserRouter, redirect } from "react-router"; // ✅ ICI

import Login from "./pages/login";
import Task from "./pages/task";
import Routine from "./pages/routine";
import Session from "./pages/session";
import RootLayout from "./pages/rootLayout";
import CreateTask from "./pages/createTask";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                loader: () => redirect("/task"),
            },
            {
                path: "/task",
                Component: Task,
            },
            {
                path: "/routine",
                Component: Routine,
            },
            {
                path: "/session",
                Component: Session,
            },
            {
                path: "/login",
                Component: Login,
            },
            {
                path: "/createTask",
                Component: CreateTask,
            },
        ],
    },
]);
