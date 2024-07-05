import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/sideBar/sideBar";

function AdminLayout() {
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
