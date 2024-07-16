import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routers } from "./App.tsx";
import "./index.css";
import axios from "axios";
import { ProductsProvider } from "./contexts/ProductsContext.tsx";
import React from "react";
import { LoadingProvider } from "./contexts/LoadingContext.tsx";
import configureAxios from "./configs/axios.tsx";

axios.defaults.baseURL = "http://localhost:3000";
configureAxios();
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ProductsProvider>
            <LoadingProvider>
                <RouterProvider router={routers} />
            </LoadingProvider>
        </ProductsProvider>
    </React.StrictMode>
);
