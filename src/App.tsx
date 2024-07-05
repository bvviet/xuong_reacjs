import { createBrowserRouter } from "react-router-dom";
import "./App.css";

import ClientLayout from "./Layouts/Client/ClientLayout";
import HomeClient from "./pages/Client/HomeClient";

function App() {
    return (
        <Routes>
            <Route path="/" element={<ClientLayout />}>
                <Route index element={<HomeClient />} />
                <Route index element={<HomeClient />} />
            </Route>
        </Routes>
    );
}

// export default App;
