import { ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/sideBar/sideBar";
import theme from "../../components/admin/theme/theme";
import { useContext } from "react";
import { LoadingContext } from "../../contexts/LoadingContext";
import Loading from "../../components/client/Loading/Loading";

function AdminLayout() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("LoadingContext must be used within a LoadingProvider");
  }

  const { isLoading } = context;
  return (
    <>
      <Loading isShow={isLoading} />
      <ThemeProvider theme={theme}>
        <Stack direction={"row"} gap={2}>
          <Sidebar />
          <Outlet />
        </Stack>
      </ThemeProvider>
    </>
  );
}

export default AdminLayout;
