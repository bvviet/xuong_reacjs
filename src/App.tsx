import { createBrowserRouter } from "react-router-dom";
import "./App.css";

import ClientLayout from "./Layouts/Client/ClientLayout";
import HomeClient from "./pages/Client/HomeClient";

import AdminLayout from "./Layouts/admin/AdminLayout";
import AdminProductList from "./pages/Admin/list";
import AdminProductAdd from "./pages/Admin/add";
import AdminProductEdit from "./pages/Admin/edit";
import DetailClient from "./pages/Client/DetailClient";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            {
                path: "/",
                element: <HomeClient />,
            },
            {
                path: "/detail/:id",
                element: <DetailClient />,
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
            {
                path: "edit/:productId",
                element: <AdminProductEdit />,
            },
        ],
    },
]);
