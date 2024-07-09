import { ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/sideBar/sideBar";
import theme from "../../components/admin/theme/theme";

function AdminLayout() {
  return (
    <>
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
