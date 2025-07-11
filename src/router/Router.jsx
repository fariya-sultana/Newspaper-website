import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import RootLayout from "../layout/RootLayout";
import DashboardLayout from "../layout/DashboardLayout";
import AuthLayout from "../layout/AuthLayout";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {

            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
               path: 'login',
                Component: LogIn 
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    }

]);

export default router;