import {
    Button,
    Container,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Flash from "../../components/admin/Flash/flash";
import ConfirmDialog from "../../components/admin/confimButton/confim";
import { LoadingContext } from "../../contexts/LoadingContext";
import { CheckOut } from "../../types/products";
import FormatPrice from "../../components/client/FormatPrice/FormatPrice";

function OrderList() {
    const [showFlash, setShowFlash] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [cart, setCart] = useState<CheckOut[]>([]);
    const [idDelete, setIdDelete] = useState<string | null>(null);
    const [flashSeverity, setFlashSeverity] = useState<"success" | "error">(
        "success"
    );
    const context = useContext(LoadingContext);

    if (!context) {
        throw new Error("LoadingContext must be used within a LoadingProvider");
    }

    const { setIsLoading } = context;

    const getAllOrders = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get("/cart");
            setCart(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    const handleConfirm = (id: string) => {
        setConfirm(true);
        setIdDelete(id);
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/cart/${idDelete}`);
            setFlashSeverity("success");
            setShowFlash(true);
            getAllOrders();
        } catch (error) {
            setFlashSeverity("error");
            setShowFlash(true);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseFlash = () => {
        setShowFlash(false);
    };

    return (
        <Container sx={{ marginTop: "24px" }}>
            <Flash
                isShow={showFlash}
                message={
                    flashSeverity === "success"
                        ? "Delete Successfully."
                        : "Delete Failed."
                }
                severity={flashSeverity}
                onClose={handleCloseFlash}
            />
            <Stack gap={2}>
                <Typography variant="h2" textAlign="center" sx={{ fontSize: "3.5rem" }}>
                    Order List
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1100 }} aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: "16px" }}>Cart ID</TableCell>
                                <TableCell sx={{ fontSize: "16px" }}>User Name</TableCell>
                                <TableCell sx={{ fontSize: "16px" }}>Cart</TableCell>
                                <TableCell sx={{ fontSize: "16px" }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item._id}</TableCell>
                                    <TableCell sx={{ fontSize: "14px" }}>{item.userId?.username || "N/A"}</TableCell>
                                    <TableCell>
                                        <Stack spacing={2}>
                                            {item.cartItems.map((cartItem) => (
                                                <Paper key={cartItem.product._id} sx={{ padding: 2 }}>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="col-span-1">
                                                            <Typography sx={{ display: "flex", justifyContent: "center", fontSize: "16px" }} variant="h6">{cartItem.product.name}</Typography>
                                                            <Typography sx={{ display: "flex" }}>
                                                                Giá:
                                                                <FormatPrice sx={{ ml: 1 }} price={cartItem.product.price} />
                                                            </Typography>
                                                            <Typography>Số lượng: {cartItem.quantity}</Typography>
                                                            <Typography sx={{ display: "flex" }}>
                                                                Tổng tiền:
                                                                <FormatPrice sx={{ ml: 1, color: "red" }} price={cartItem.product.price * cartItem.quantity} />
                                                            </Typography>
                                                            <Typography>Thể loại: {cartItem.product.category.name}</Typography>
                                                        </div>
                                                        <div className="col-span-1 flex items-center">
                                                            <img
                                                                src={cartItem.product.image}
                                                                alt={cartItem.product.name}
                                                                width="150"
                                                            />
                                                        </div>
                                                    </div>
                                                </Paper>
                                            ))}
                                        </Stack>

                                    </TableCell>
                                    <TableCell>
                                        <Stack direction={"row"} gap={3} justifyContent={"center"}>
                                            <Link to={`/admin/edit/${item._id}`}>
                                                <Button
                                                    variant="contained"
                                                    sx={{ bgcolor: "blue", padding: "10px 0px" }}
                                                >
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="contained"
                                                sx={{ bgcolor: "red" }}
                                                onClick={() => handleConfirm(item._id)}
                                            >
                                                Delete
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ConfirmDialog
                        confirm={confirm}
                        onConfirm={setConfirm}
                        onDelete={handleDelete}
                    />
                </TableContainer>
            </Stack>
        </Container>
    );
}

export default OrderList;
