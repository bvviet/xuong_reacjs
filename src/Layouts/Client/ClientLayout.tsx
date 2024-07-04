import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const ClientLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};
export default ClientLayout;
