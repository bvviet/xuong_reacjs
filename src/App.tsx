import { createBrowserRouter } from "react-router-dom";
import "./App.css";

import ClientLayout from "./Layouts/Client/ClientLayout";
import HomeClient from "./pages/Client/HomeClient";

import AdminLayout from "./Layouts/admin/AdminLayout";
import AdminProductList from "./pages/Admin/list";
import AdminProductAdd from "./pages/Admin/add";
import AdminProductEdit from "./pages/Admin/edit";
import DetailClient from "./pages/Client/DetailClient";
import GenreList from "./pages/AdminGenre/listGenre";
import AddGenre from "./pages/AdminGenre/addGenre";
import EditGenre from "./pages/AdminGenre/editGenre";
import Cart from "./pages/Client/Cart";
import Checkout from "./pages/Client/Checkout";
import ThankUPage from "./pages/Client/Tkspage";

import AdminOrderList from "./pages/Admin_checkout/list";
import OrderList from "./pages/Admin_checkout/listOrder";

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
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />
      },
      {
        path: "/thanku",
        element: <ThankUPage />
      }
    ],
  },
  {
    path: "/admin",
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          //admin product
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
          //admin category
          {
            path: "listGenre",
            element: <GenreList />,
          },
          {
            path: "addGenre",
            element: <AddGenre />,
          },
          {
            path: "editGenre/:categoryId",
            element: <EditGenre />,
          },
          //admin order
          {
            path: "listOrder",
            element: <AdminOrderList />,
          },
          {
            path: "listOrderItems",
            element: <OrderList />,
          },
        ],
      },
    ],
  },
]);
