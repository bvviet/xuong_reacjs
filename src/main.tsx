import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routers } from "./App.tsx";
import "./index.css";
import axios from "axios";
import { ProductsProvider } from "./contexts/ProductsContext.tsx";

axios.defaults.baseURL = "http://localhost:3000";

ReactDOM.createRoot(document.getElementById("root")!).render(
    //   <React.StrictMode>
    //     <BrowserRouter>
    //       <App />
    //     </BrowserRouter>
    //   </React.StrictMode>
    <ProductsProvider>
        <RouterProvider router={routers} />
    </ProductsProvider>
);
