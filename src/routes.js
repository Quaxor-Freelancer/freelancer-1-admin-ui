import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

//layouts
import HomeLayout from "./components/layout/HomeLayout";
import AuthenticationLayout from "./components/layout/AuthenticationLayout";

//pages
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import Withdrawal from "./pages/withdrawal";

const Routes = () => {
    let router = useRoutes([
        {
            path: "/",
            element: <HomeLayout />,
            children: [
                {
                    path: "dashboard",
                    element:<>Dashboard</>,
                },
                {
                    path: "withdrawal",
                    element:<Withdrawal />,
                },
            ],
        },
        { path: "/", element: <Navigate to="dashboard" /> },
        { path: "*", element: <Navigate to="dashboard" /> },
    ]);

    return router;
}

const AuthRoutes = () => {
    let authRouter = useRoutes([
        {
            path: "auth",
            element: <AuthenticationLayout />,
            children: [
                {
                    path: "signin",
                    element: <SignIn />,
                },
                {
                    path: "signup",
                    element: <SignUp />
                },
            ],
        },
        { path: "/", element: <Navigate to="/auth/signin" /> },
        { path: "*", element: <Navigate to="/auth/signin" /> },
    ])

    return authRouter
}
export {
    Routes,
    AuthRoutes
} 