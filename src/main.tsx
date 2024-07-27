import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routers } from "./App.tsx";
import "./index.css";
import axios from "axios";
import { ProductsProvider } from "./contexts/ProductsContext.tsx";
import React from "react";
import { LoadingProvider } from "./contexts/LoadingContext.tsx";
import configureAxios from "./configs/axios.tsx";
import { UserProvider } from "./contexts/userContext.tsx";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { FavoriteProvider } from "./contexts/favoriteContext.tsx";
import { TotalPriceProvider } from "./contexts/TotalPriceContext.tsx";

axios.defaults.baseURL = "http://localhost:3000";
configureAxios();
const theme = createTheme({
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
    },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <UserProvider>
            <ProductsProvider>
                <LoadingProvider>
                    <FavoriteProvider>
                        <ThemeProvider theme={theme}>
                            <TotalPriceProvider>
                                <RouterProvider router={routers} />
                            </TotalPriceProvider>
                        </ThemeProvider>
                    </FavoriteProvider>
                </LoadingProvider>
            </ProductsProvider>
        </UserProvider>
    </React.StrictMode>
);
