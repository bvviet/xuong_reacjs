import { ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/sideBar/sideBar";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";

function AdminLayout() {
    const { user } = useContext(UserContext);
    console.log(user);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        } else if (user?.role !== "admin") {
            navigate("/");
            alert("Bạn không có quyền vào trang quản trị");
            return;
        }
    }, [token, navigate]);
    return (
        <>
            <Stack direction={"row"} gap={2}>
                <Sidebar />
                <Outlet />
            </Stack>
        </>
    );
}

export default AdminLayout;
