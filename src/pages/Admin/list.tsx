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

import { IProduct } from "../../types/products";
import Flash from "../../components/admin/Flash/flash";
import ConfirmDialog from "../../components/admin/confimButton/confim";
import { LoadingContext } from "../../contexts/LoadingContext";

function AdminProductList() {
  const [showFlash, setShowFlash] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
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
  const getAllProduct = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleConfirm = (id: string) => {
    setConfirm(true);
    setIdDelete(id);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete("/products/" + idDelete);
      setFlashSeverity("success");
      setShowFlash(true);
      getAllProduct();
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
          <Link to="/admin/add">
            <Button variant="contained">Add Product</Button>
          </Link>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1100 }} aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Desc</TableCell>
                  <TableCell align="right">Image</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((prd) => (
                  <TableRow
                    key={prd.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {prd.name}
                    </TableCell>
                    <TableCell align="right">{prd.price}</TableCell>
                    <TableCell align="right">{prd.description}</TableCell>
                    <TableCell align="right">
                      <img
                        src={prd.image}
                        alt=""
                        style={{ width: "150px", height: "100px" }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {prd.category ? prd.category.name : "N/A"}
                    </TableCell>
                    <TableCell align="right">
                      {prd.isShow ? "True" : "Fales"}
                    </TableCell>
                    <TableCell align="right">
                      <Stack
                        direction={"row"}
                        gap={3}
                        justifyContent={"center"}
                      >
                        <Link to={"/admin/edit/" + prd._id}>
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
                          onClick={() => handleConfirm(prd._id)}
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

export default AdminProductList;
