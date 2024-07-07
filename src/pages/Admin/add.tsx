import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { ProductForm, Category } from "../../types/products";
import { useState, useEffect } from "react";
import Flash from "../../components/admin/Flash/flash";

function AdminProductAdd() {
  const nav = useNavigate();
  const [showFlash, setShowFlash] = useState(false);
  const [flashSeverity, setFlashSeverity] = useState<"success" | "error">(
    "success"
  );
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (values: ProductForm) => {
    try {
      await axios.post("/products", values);
      setFlashSeverity("success");
      setShowFlash(true);
      setTimeout(() => {
        nav("/admin/list");
      }, 2000);
    } catch (error) {
      setFlashSeverity("error");
      console.error(error);
      setShowFlash(true);
    }
  };

  const handleCloseFlash = () => {
    setShowFlash(false);
  };

  const validate = (values: ProductForm) => {
    const { name, image, category, price, description } = values;
    const errors: ValidationErrors = {};
    if (!name) errors.name = "Name is required";
    if (!image) errors.image = "Image is required";
    if (!description) errors.description = "Description is required";
    if (!category) errors.category = "Category is required";
    if (!price) errors.price = "Price is required";

    return errors;
  };

  return (
    <>
      <Container>
        <Flash
          isShow={showFlash}
          message={
            flashSeverity === "success" ? "Add Successfully." : "Add Failed."
          }
          severity={flashSeverity}
          onClose={handleCloseFlash}
        />
        <Stack
          gap={2}
          sx={{ justifyContent: "center", margin: "auto", maxWidth: 600 }}
        >
          <Typography variant="h3" textAlign="center">
            Add Product
          </Typography>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={{ isShow: true }}
            render={({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Stack gap={2} sx={{ fontSize: "1.6rem", fontWeight: "500" }}>
                  <Field
                    name="name"
                    render={({ input, meta }) => (
                      <TextField
                        label="Name"
                        variant="standard"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        {...input}
                      />
                    )}
                  />
                  <Field
                    name="image"
                    render={({ input, meta }) => (
                      <TextField
                        label="Image"
                        variant="standard"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        {...input}
                      />
                    )}
                  />
                  <Field
                    name="description"
                    render={({ input, meta }) => (
                      <TextField
                        label="Description"
                        variant="standard"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        {...input}
                      />
                    )}
                  />
                  <Field
                    name="price"
                    render={({ input, meta }) => (
                      <TextField
                        label="Price"
                        variant="standard"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        {...input}
                        type="number"
                      />
                    )}
                  />
                  <Field
                    name="isShow"
                    type="checkbox"
                    render={({ input }) => (
                      <FormControlLabel
                        control={<Checkbox {...input} />}
                        label="Show Product"
                      />
                    )}
                  />
                  <Field
                    name="category"
                    render={({ input, meta }) => (
                      <FormControl
                        fullWidth
                        error={meta.touched && Boolean(meta.error)}
                      >
                        <InputLabel>Select category</InputLabel>
                        <Select label="Category" {...input}>
                          {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {meta.touched && meta.error && (
                          <FormHelperText>{meta.error}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            )}
          />
        </Stack>
      </Container>
    </>
  );
}

export default AdminProductAdd;