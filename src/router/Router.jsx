import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import RootLayout from "../layout/RootLayout";
import DashboardLayout from "../layout/DashboardLayout";
import AuthLayout from "../layout/AuthLayout";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import Forbidden from "../pages/Forbidden";
import PrivateRoutes from "../routes/PrivateRoutes";
import AddArticle from "../pages/AddArticle";
import AdminRoute from "../routes/AdminRoutes";
import AllUsers from "../pages/Dashboard/AllUsers";
import AllArticles from "../pages/Dashboard/AllArticles";
import AddPublishers from "../pages/Dashboard/AddPublishers";
import PremiumRoute from "../routes/PremiumRoute";
import PremiumArticles from "../pages/PremiumArticles";
import AllArticle from "../pages/AllArticle";
import ArticleDetails from "../pages/ArticleDetails";
import SubscriptionPage from "../pages/SubscriptionPage";
import PaymentPage from "../pages/PaymentPage";

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
            },
            {
                path: 'add-article',
                element: <PrivateRoutes><AddArticle></AddArticle></PrivateRoutes>
            },
            {
                path: 'all-article',
                Component: AllArticle
            },
            {
                path: '/articles/:id',
                element: <PrivateRoutes><ArticleDetails></ArticleDetails></PrivateRoutes>
            },
            {
                path: '/subscription',
                element: <PrivateRoutes><SubscriptionPage /></PrivateRoutes>
            },
            {
                path: 'payment',
                element: <PrivateRoutes><PaymentPage></PaymentPage></PrivateRoutes>
            },
            {
                path: 'premium-articles',
                element: <PremiumRoute><PremiumArticles></PremiumArticles></PremiumRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'articles',
                element: <AdminRoute><AllArticles></AllArticles></AdminRoute>
            },
            {
                path: 'publishers',
                element: <AdminRoute><AddPublishers></AddPublishers></AdminRoute>
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