import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/client/Loading/Loading";
import { LoadingContext } from "../../contexts/LoadingContext";
import { useContext } from "react";
import { CartProvider } from "../../contexts/CartContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../components/admin/theme/theme";

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
          <ThemeProvider theme={theme}>

            <Outlet />
          </ThemeProvider>
        </Container>
      </CartProvider>
    </div>
  );
};
export default ClientLayout;
