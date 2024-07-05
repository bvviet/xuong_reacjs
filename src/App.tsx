import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientLayout from "./Layouts/Client/ClientLayout";
import HomeClient from "./pages/Client/HomeClient";
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

export default App;
