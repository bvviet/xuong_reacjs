import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";

const ClientLayout = () => {
    return (
        <div>
            <Header />
            <Container maxWidth="xl" sx={{ marginTop: "75px" }}>
                <ToastContainer />
                <Outlet />
            </Container>
        </div>
    );
};
export default ClientLayout;
