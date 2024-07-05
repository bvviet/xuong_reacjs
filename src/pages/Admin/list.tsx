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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IProduct } from "../../types/products";
import Flash from "../../components/admin/Flash/flash";
import ConfirmDialog from "../../components/admin/confimButton/confim";

function AdminProductList() {
  const [showFlash, setShowFlash] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [idDelete, setIdDelete] = useState<string | null>(null);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
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
      await axios.delete("/products/" + idDelete);
      setShowFlash(true);
      getAllProduct();
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseFlash = () => {
    setShowFlash(false);
  };

  return (
    <>
      <Container>
        <Flash
          isShow={showFlash}
          message="This is a success Alert."
          severity="success"
          onClose={handleCloseFlash}
        />
        <Stack gap={2}>
          <Typography
            variant="h2"
            textAlign="center"
            sx={{ fontSize: "2.5rem" }}
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
                    <TableCell align="right">{prd.image}</TableCell>
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
                        <Link to={""}>
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
