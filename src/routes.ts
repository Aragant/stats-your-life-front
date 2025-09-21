import { createBrowserRouter } from "react-router"; // ✅ ICI

import Login from './pages/login';
import Task from './pages/task'
import Routine from './pages/routine';
import Session from './pages/session';
import RootLayout from "./pages/rootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
        index: true,
        Component: Task
      },
      {
        index: true,
        path: "/task",
        Component: Task
      },
      {
        path: "/routine",
        Component: Routine
      },
      {
        path: "/session",
        Component: Session
      },
      {
        path: "/login",
        Component: Login
      },
    ]
  }
]);