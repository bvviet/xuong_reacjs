import { createBrowserRouter } from "react-router-dom";
import "./App.css";

import ClientLayout from "./Layouts/Client/ClientLayout";
import HomeClient from "./pages/Client/HomeClient";

import AdminLayout from "./Layouts/admin/AdminLayout";
import AdminProductList from "./pages/Admin/list";
import AdminProductAdd from "./pages/Admin/add";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            {
                path: "/",
                element: <HomeClient />,
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "list",
                element: <AdminProductList />,
            },
            {
                path: "add",
                element: <AdminProductAdd />,
            },
        ],
    },
]);
