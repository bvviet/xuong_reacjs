import { Route, Routes } from "react-router-dom";
import "./App.css";
import ClientLayout from "./Layouts/Client/ClientLayout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<ClientLayout />}>
                <Route index element={<p>Home</p>} />
            </Route>
        </Routes>
    );
}

export default App;
