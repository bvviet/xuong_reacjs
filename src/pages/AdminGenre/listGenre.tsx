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

import { Category } from "../../types/products";
import Flash from "../../components/admin/Flash/flash";
import ConfirmDialogCate from "../../components/admin/confimButton/confimCate";

function GenreList() {
  const [showFlash, setShowFlash] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [category, setCategory] = useState<Category[]>([]);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [flashSeverity, setFlashSeverity] = useState<"success" | "error">(
    "success"
  );

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleConfirm = (id: string) => {
    setConfirm(true);
    setIdDelete(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/categories/" + idDelete);
      setFlashSeverity("success");
      setShowFlash(true);
      getAllCategory();
    } catch (error) {
      setFlashSeverity("error");
      setShowFlash(true);
      console.log(error);
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
            Category List
          </Typography>
          <Link to="/admin/add">
            <Button variant="contained">Add Category</Button>
          </Link>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1100 }} aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {category.map((cate) => (
                  <TableRow
                    key={cate.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {cate.name}
                    </TableCell>
                    <TableCell align="right">
                      <Stack
                        direction={"row"}
                        gap={3}
                        justifyContent={"center"}
                      >
                        <Link to={"/admin/editGenre/" + cate._id}>
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
                          onClick={() => handleConfirm(cate._id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ConfirmDialogCate
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

export default GenreList;
