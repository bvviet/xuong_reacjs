import * as React from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Badge, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FormatPrice from "../../../components/client/FormatPrice/FormatPrice";
import { FavoriteContext } from "../../../contexts/favoriteContext";
import ConfirmDelete from "../../../components/client/ConfirmDelete";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { UserContext } from "../../../contexts/userContext";
import { toast } from "react-toastify";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const FavoriteDialog = () => {
    const context = React.useContext(FavoriteContext);
    const [open, setOpen] = React.useState(false);
    const { user } = React.useContext(UserContext);
    const loadingContext = React.useContext(LoadingContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteFavorite = async (productId: string) => {
        try {
            loadingContext?.setIsLoading(true);
            const res = await axios.delete(`http://localhost:3000/favorite/${user?._id}/${productId}`);

            if (res.status === 200) {
                context?.setFavorites(
                    (prevFavorites) => prevFavorites?.filter((fav) => fav.productId._id !== productId) || []
                );
                toast.success("Xóa thành công", {
                    position: "top-right",
                    autoClose: 1000,
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            loadingContext?.setIsLoading(false);
        }
    };

    const lengthFavorites = context?.lengthFavorites || 0;

    return (
        <React.Fragment>
            <IconButton onClick={handleClickOpen} color="inherit" sx={{ marginRight: 2, fontSize: "3rem" }}>
                <Badge badgeContent={lengthFavorites} color="primary">
                    <FavoriteIcon color="secondary" sx={{ fontSize: "inherit" }} />
                </Badge>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                PaperProps={{
                    sx: {
                        width: "28%",
                        maxWidth: "none",
                        height: "100%",
                        position: "fixed",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: "auto",
                    },
                }}
            >
                <AppBar sx={{ position: "sticky" }}>
                    <Toolbar sx={{ background: "#fff9e5", color: "#000" }}>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon sx={{ fontSize: "2rem" }} />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1, fontSize: "1.3rem" }} variant="h6" component="div">
                            Danh sách sản phẩm yêu thích của {user?.username}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List sx={{ padding: "10px 10px 0 10px" }}>
                    {context?.favorites?.map((item) => (
                        <React.Fragment key={item.productId._id}>
                            <ListItemButton>
                                <Link to={`/detail/${item.productId._id}`}>
                                    <Stack direction={"row"} spacing={3} alignItems={"center"}>
                                        <img
                                            style={{ width: "50px", borderRadius: "10px" }}
                                            src={`${item.productId.image}`}
                                            alt={`${item.productId.name}`}
                                        />
                                        <ListItemText
                                            primary={`${item.productId.name}`}
                                            secondary={<FormatPrice price={item.productId.price} />}
                                            primaryTypographyProps={{
                                                sx: { fontSize: "1.5rem", fontWeight: "500", color: "#1A162E" },
                                            }}
                                            secondaryTypographyProps={{ sx: { fontSize: "1.2rem" } }}
                                        />
                                        <ConfirmDelete
                                            title="Bạn chắn chắn muốn xóa khỏi danh sách yêu thích chứ❓"
                                            handleDelete={() => handleDeleteFavorite(item.productId._id)}
                                        >
                                            <DeleteIcon sx={{ fontSize: "2rem" }} />
                                        </ConfirmDelete>
                                    </Stack>
                                </Link>
                            </ListItemButton>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Dialog>
        </React.Fragment>
    );
};

export default FavoriteDialog;
