import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { Container } from "@mui/material";

const ClientLayout = () => {
    return (
        <div>
            <Header />
            <Container maxWidth="xl">
                <Outlet />
            </Container>
        </div>
    );
};
export default ClientLayout;
