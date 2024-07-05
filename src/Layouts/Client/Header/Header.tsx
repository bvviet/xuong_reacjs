import * as React from "react";
import { styled } from "@mui/system";
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

import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import Search from "../../../components/client/Search/Search";
import Register from "../../../pages/Client/Register";

const pages = ["Products", "Pricing", "Blog"];

const StyledAppBar = styled(AppBar)({
    color: "#000",
    width: "100%",
    padding: "10px 0",
    backgroundColor: "#FFF9E5",
    boxShadow: "none",
});

function Header() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        // setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA2MSeKgctfF4s5UrZQTz03Vsnl9ke1tJniA&s"
                        alt=""
                        style={{ width: "40px", marginRight: "15px" }}
                    />
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
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, marginLeft: "100px" }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "#000", display: "block", fontSize: "1.6rem", margin: "0 20px" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {/* Tìm kiếm */}
                    <Search />
                    {/* Avatar */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip sx={{ fontSize: "1.6rem" }} title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
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
                                        gap: "10px",
                                    }}
                                    textAlign="center"
                                >
                                    <Link to={"/profile"}>Profile</Link>
                                    <Link to={"/account"}>Account</Link>
                                    <Link to={"/dashboard"}>Dashboard</Link>
                                    <Link to={"/logout"}>Logout</Link>
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    {/* Đăng ký đăng nhập */}
                    <Stack spacing={2} direction="row">
                        <CustomButton variant="text" size="large">
                            Đăng nhập
                        </CustomButton>

                        <CustomButton onClick={handleOpen} variant="contained" size="large">
                            Đăng ký
                        </CustomButton>
                        <Register open={open} onClose={handleClose} />
                    </Stack>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
}

export default Header;
