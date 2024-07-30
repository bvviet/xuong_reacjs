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
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";


import Flash from "../../components/admin/Flash/flash";
import ConfirmDialog from "../../components/admin/confimButton/confim";
import { LoadingContext } from "../../contexts/LoadingContext";
import { CheckOut } from "../../types/products";

function AdminOrderList() {
    const [showFlash, setShowFlash] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [checkout, setCheckout] = useState<CheckOut[]>([]);
    const [idDelete, setIdDelete] = useState<string | null>(null);
    const [flashSeverity, setFlashSeverity] = useState<"success" | "error">(
        "success"
    );
    const context = useContext(LoadingContext);
    // Kiểm tra nếu context là undefined để tránh lỗi
    if (!context) {
        throw new Error("LoadingContext must be used within a LoadingProvider");
    }
    const { setIsLoading } = context;
    const getAllOder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get("/checkout");
            setCheckout(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllOder();
    }, []);

    const handleConfirm = (id: string) => {
        setConfirm(true);
        setIdDelete(id);
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete("/checkout/" + idDelete);
            setFlashSeverity("success");
            setShowFlash(true);
            getAllOder();
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
        <>
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
                    <Typography
                        variant="h2"
                        textAlign="center"
                        sx={{ fontSize: "3.5rem" }}
                    >
                        Product List
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1100 }} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Phone</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">City</TableCell>
                                    <TableCell align="right">State</TableCell>
                                    <TableCell align="right">Address</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {checkout.map((item) => (
                                    <TableRow
                                        key={item.name}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.name}
                                        </TableCell>
                                        <TableCell align="right">{item.phone}</TableCell>
                                        <TableCell align="right">{item.email}</TableCell>
                                        <TableCell align="right">{item.city}</TableCell>
                                        <TableCell align="right">{item.stage}</TableCell>
                                        <TableCell align="right">{item.address}</TableCell>
                                        <TableCell align="right">
                                            <Stack
                                                direction={"row"}
                                                gap={3}
                                                justifyContent={"center"}
                                            >
                                                <Link to={"/admin/edit/" + item._id}>
                                                    <Button
                                                        variant="contained"
                                                        sx={{ bgcolor: "blue", padding: " 10px 0px" }}
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
        </>
    );
}

export default AdminOrderList;
