import { createBrowserRouter } from "react-router-dom";
import "./App.css";

import ClientLayout from "./Layouts/Client/ClientLayout";
import HomeClient from "./pages/Client/HomeClient";
<<<<<<< HEAD
import DetailClient from "./pages/Client/DetailClient";

function App() {
    return (
        <Routes>
            <Route path="/" element={<ClientLayout />}>
                <Route index element={<HomeClient />} />
                <Route index element={<HomeClient />} />
                <Route path="/detail/:id" element={<DetailClient />} />
            </Route>
        </Routes>
    );
}
=======
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
// function App() {
//     return (
//         <Routes>
//             <Route path="/" element={<ClientLayout />}>
//                 <Route index element={<HomeClient />} />
//             </Route>
//             <Route path="/admin" element={<AdminLayout />}>
//                 <Route index element={<AdminProductList/>} />
//             </Route>
//         </Routes>
>>>>>>> d905978889196dfad378b2c0db79e9cb03181564

//     );
// }

// export default App;
