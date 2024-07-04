import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { Container } from "@mui/material";

const ClientLayout = () => {
    return (
        <div>
            <Header />
            <Container maxWidth="xl" sx={{ marginTop: "75px" }}>
                <Outlet />
            </Container>
        </div>
    );
};
export default ClientLayout;
