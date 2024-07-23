import { Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/sideBar/sideBar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import Loading from "../../components/client/Loading/Loading";
import theme from "../../components/admin/theme/theme";

function AdminLayout() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const context = useContext(LoadingContext);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    if (!context) {
        throw new Error("LoadingContext must be used within a LoadingProvider");
    }

    const { isLoading } = context;

    useEffect(() => {
        if (!token) {
            setTimeout(() => {
                alert("Bạn cần đăng nhập để vào admin");
            }, 500);
            navigate("/");
            return;
        }

        if (user) {
            if (user.role !== "admin") {
                setTimeout(() => {
                    alert("Bạn không có quyền vào trang quản trị");
                }, 500);
                navigate("/");
            } else {
                setIsAuthorized(true);
            }
        }
    }, [token, user, navigate]);

    if (isAuthorized === null) {
        return <Loading isShow={isLoading} />;
    }

    if (!isAuthorized) {
        return null; // Hoặc một component khác nếu bạn muốn
    }

    return (
        <ThemeProvider theme={theme}>
            <Stack direction={"row"} gap={2}>
                <Sidebar />
                <Outlet />
            </Stack>
        </ThemeProvider>
    );
}

export default AdminLayout;
