import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import RootLayout from "../layout/RootLayout";
import DashboardLayout from "../layout/DashboardLayout";
import AuthLayout from "../layout/AuthLayout";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import Forbidden from "../pages/Forbidden";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'forbidden',
                Component: Forbidden
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <ErrorPage />,
        children: [
            {

            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        errorElement: <ErrorPage />,
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