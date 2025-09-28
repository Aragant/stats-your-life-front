import { createBrowserRouter, redirect } from "react-router"; // ✅ ICI

import Login from "./pages/login";
import Task from "./pages/task/task";
import Routine from "./pages/Routine";
import Session from "./pages/session";
import RootLayout from "./pages/rootLayout";
import CreateTask from "./pages/task/taskCreate";
import RoutineCreate from "./pages/routineCreate";

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
            {
                path: "/routineCreate",
                Component: RoutineCreate,
            },
        ],
    },
]);
