import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { useNavigate, useParams } from "react-router-dom";
import { GenreFrom } from "../../types/products";
import { useEffect, useState } from "react";
import Flash from "../../components/admin/Flash/flash";

function EditGenre() {
  const nav = useNavigate();
  const { categoryId } = useParams();
  const [initialValues, setInitialValues] = useState<GenreFrom | null>(null);
  const [showFlash, setShowFlash] = useState(false);
  const [flashSeverity, setFlashSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/categories/${categoryId}`);
        setInitialValues(response.data);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      }
    };

    fetchProduct();
  }, [categoryId]);

  const onSubmit = async (values: GenreFrom) => {
    try {
      await axios.put(`/categories/${categoryId}`, values);
      setFlashSeverity("success");
      setShowFlash(true);
      setTimeout(() => {
        nav("/admin/listGenre");
      }, 2000);
    } catch (error) {
      console.error(error);
      setFlashSeverity("error");
      setShowFlash(true);
    }
  };

  const handleCloseFlash = () => {
    setShowFlash(false);
  };

  const validate = (values: GenreFrom) => {
    const { name } = values;
    const errors: ValidationErrors = {};
    if (!name) errors.name = "Name is required";

    return errors;
  };

  return (
    <>
      <Container sx={{marginTop:"24px"}}>
        <Flash
          isShow={showFlash}
          message={
            flashSeverity === "success"
              ? "Update Successfully."
              : "Update Failed."
          }
          severity={flashSeverity}
          onClose={handleCloseFlash}
        />
        <Stack
          gap={2}
          sx={{ justifyContent: "center", margin: "auto", maxWidth: 600 }}
        >
          <Typography variant="h2" sx={{ fontSize: "3.5rem" }}  textAlign="center">
            Edit Category
          </Typography>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialValues}
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

export default EditGenre;
