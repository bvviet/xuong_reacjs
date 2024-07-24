import * as React from "react";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { Badge, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Search from "../../../components/client/Search/Search";
import Register from "../../../pages/Client/Register";
import Login from "../../../pages/Client/Login";
import Category from "../../../components/client/Category/Category";
import { UserContext } from "../../../contexts/userContext";
import { useCart } from "../../../contexts/CartContext";
import FavoriteDialog from "../../../pages/Client/Favorite/Favorites";

const StyledAppBar = styled(AppBar)({
    color: "#000",
    width: "100%",
    padding: "10px 0",
    backgroundColor: "#FFF9E5",
    boxShadow: "none",
});

function Header() {
    const [openRegister, setOpenRegister] = React.useState(false);
    const [openLogin, setOpenLogin] = React.useState(false);
    const { user, fetchUser, setUser } = React.useContext(UserContext);
    const handleOpenRegister = () => setOpenRegister(true);
    const handleCloseRegister = () => setOpenRegister(false);
    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => setOpenLogin(false);

    const token = localStorage.getItem("token");
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
     const { cart } = useCart();
  console.log(cart);
    const CustomButton = styled(Button)(() => ({
        fontSize: "1.4rem",
        color: "#191B1D",
        "&.MuiButton-contained": {
            background: "#FF5B26",
            borderRadius: "60px",
        },
    }));

    return (
        <StyledAppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{}}>
                    {/* Logo */}
                    <Link to={"/"}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA2MSeKgctfF4s5UrZQTz03Vsnl9ke1tJniA&s"
                            alt=""
                            style={{ width: "40px", marginRight: "15px" }}
                        />
                    </Link>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                            fontSize: "2.4rem",
                        }}
                    >
                        Double V
                    </Typography>
                    <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    {/* Menu */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            marginLeft: "100px",
                        }}
                    >
                        <Category />
                    </Box>
                    {/* Tìm kiếm */}
                    <Search />
                    {/* Avatar */}
                    {token && (
                        <>
                            <FavoriteDialog />

                            <IconButton
                                component={Link}
                                to="/cart"
                                color="inherit"
                                sx={{ marginRight: 2, fontSize: "3rem" }}
                            >
                                {/* Card */}
                                <Badge color="primary" badgeContent={100} max={99}>
                                    <ShoppingCartIcon sx={{ fontSize: "inherit" }} />
                                </Badge>
                            </IconButton>

                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip sx={{ fontSize: "1.6rem" }} title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar
                                            alt="Viet"
                                            src="https://vov.vn/sites/default/files/styles/large/public/2021-08/CR7%202.jpg"
                                        />
                                    </IconButton>
                                </Tooltip>

                                <Menu
                                    sx={{ mt: "50px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                fontSize: "1.6rem",
                                                gap: "20px",
                                                width: "200px",
                                                padding: "10px",
                                            }}
                                            textAlign="center"
                                        >
                                            <Link to={"#"} style={{ display: "flex", alignItems: "center" }}>
                                                {" "}
                                                Xin chào:
                                                <Typography
                                                    sx={{
                                                        fontWeight: "600",
                                                        fontSize: "18px",
                                                        pl: "8px",
                                                    }}
                                                >
                                                    {user?.username}
                                                </Typography>{" "}
                                            </Link>
                                            <Link to={"/profile"}>Trang cá nhân</Link>
                                            <Link to={"/account"}>Tài khoản</Link>
                                            <Link to={"/admin"}>Trang quản trị</Link>
                                            <Link
                                                to={"#"}
                                                onClick={() => {
                                                    fetchUser();
                                                    setUser(null);
                                                    localStorage.removeItem("token");
                                                    localStorage.removeItem("user");
                                                    window.location.reload();
                                                }}
                                            >
                                                Đăng xuất
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </>
                    )}
                    {/* Đăng ký đăng nhập */}
                    {!token && (
                        <Stack spacing={2} direction="row">
                            <CustomButton onClick={handleOpenLogin} variant="text" size="large">
                                Đăng nhập
                            </CustomButton>
                            <Login
                                handleOpenLogin={openLogin}
                                onCloseLogin={handleCloseLogin}
                                onSwitchToRegister={handleOpenRegister}
                            />

                            <CustomButton onClick={handleOpenRegister} variant="contained" size="large">
                                Đăng ký
                            </CustomButton>
                            <Register
                                handleOpenRegister={openRegister}
                                onCloseRegister={handleCloseRegister}
                                onSwitchToLogin={handleOpenLogin}
                                OpenLogin={handleOpenLogin}
                            />
                        </Stack>
                    )}
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
}

export default Header;
