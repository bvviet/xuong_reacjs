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
import { ProductForm } from "../../types/products";

function AdminProductAdd() {
  const nav = useNavigate();

  const onSubmit = async (values: ProductForm) => {
    try {
      await axios.post("/products", values);
      nav("/admin/list");
    } catch (error) {
      console.error(error);
    }
  };

  const validate = (values: ProductForm) => {
    const { title, image, category, price } = values;
    const errors: ValidationErrors = {};
    if (!title) errors.title = "Can nhap title vao";
    if (!image) errors.image = "Can nhap image vao";
    if (!category) errors.category = "Can nhap category vao";
    if (!price) errors.price = "Can nhap price vao";

    return errors;
  };

  return (
    <>
      <Container>
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
                    render={({ input }) => (
                      <TextField
                        label="Description"
                        variant="standard"
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
                        <InputLabel>Category</InputLabel>
                        <Select label="Category" {...input}>
                          <MenuItem value="668831b1f39653511acf5729">
                            Rau
                          </MenuItem>
                          <MenuItem value="66883216f39653511acf572d">
                            Quả
                          </MenuItem>
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
