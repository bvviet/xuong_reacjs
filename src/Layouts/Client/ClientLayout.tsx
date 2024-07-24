import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import Loading from "../../components/client/Loading/Loading";
import { LoadingContext } from "../../contexts/LoadingContext";
import { useContext } from "react";
import { CartProvider } from "../../contexts/CartContext";

const ClientLayout = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("LoadingContext must be used within a LoadingProvider");
  }

  const { isLoading } = context;

  return (
    <div>
      <Loading isShow={isLoading} />
      <CartProvider>
        <Header />
        <Container maxWidth="xl" sx={{ marginTop: "75px" }}>
          <ToastContainer />
          <Outlet />
        </Container>
      </CartProvider>
    </div>
  );
};
export default ClientLayout;
