import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { GenreFrom } from "../../types/products";
import { useState } from "react";
import Flash from "../../components/admin/Flash/flash";

function AddGenre() {
  const nav = useNavigate();
  const [showFlash, setShowFlash] = useState(false);
  const [flashSeverity, setFlashSeverity] = useState<"success" | "error">(
    "success"
  );
  const onSubmit = async (values: GenreFrom) => {
    try {
      await axios.post("/categories", values);
      setFlashSeverity("success");
      setShowFlash(true);
      setTimeout(() => {
        nav("/admin/listGenre");
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

  const validate = (values: GenreFrom) => {
    const { name } = values;
    const errors: ValidationErrors = {};
    if (!name) errors.name = "Name is required";

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
            Add Category
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

export default AddGenre;
