import { Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles"; // Corrected import
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/sideBar/sideBar";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import Loading from "../../components/client/Loading/Loading";
import theme from "../../components/admin/theme/theme";

function AdminLayout() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("LoadingContext must be used within a LoadingProvider");
  }

  const { isLoading } = context;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    console.log(user);

    if (user) {
      if (user?.role !== "admin") {
        navigate("/");
        alert("Bạn không có quyền vào trang quản trị");
        return;
      }

      navigate("/admin");
    }
  }, [token, user, navigate]);

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
