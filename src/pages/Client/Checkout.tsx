import React, { useState } from "react";
import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Form, Field } from "react-final-form";
import { ValidationErrors } from "final-form";
import { FormData } from "../../types/formdata";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const BackgroundImage = styled("img")({
    position: "absolute",
    inset: 0,
    height: "700px",
    width: "832px",
    objectFit: "cover",
});

const Section = styled("section")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const MainContent = styled("main")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4, 8),
}));

const FormContainer = styled("div")({
    maxWidth: "80%",
});

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState<"COD" | "Transfer">("COD");

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(event.target.checked ? "Transfer" : "COD");
    };

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        city: "",
        stage: "",
        address: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = (values: FormData): ValidationErrors => {
        const { name, email, phone, city, stage, address } = values;
        const errors: ValidationErrors = {};

        if (!name) errors.name = "Vui lòng điền tên";
        if (!email) errors.email = "Vui lòng điền email";

        if (!phone) {
            errors.phone = "Vui lòng điền số điện thoại";
        } else if (!/^[0-9]+$/.test(phone)) {
            errors.phone = "Số điện thoại không đúng định dạng";
        } else if (!phone.startsWith("0")) {
            errors.phone = "Số điện thoại phải bắt đầu bằng số 0";
        } else if (phone.length !== 10) {
            errors.phone = "Số điện thoại phải có độ dài 10 số";
        }
        if (!city) errors.city = "Vui lòng nhập thành phố";
        if (!stage) errors.stage = "Vui lòng nhập quận, huyện, xã";
        if (!address) errors.address = "Vui lòng nhập địa chỉ";
        return errors;
    };

    const handleSubmit = async (values: FormData) => {


    };

    return (
        <Section>
            <ToastContainer />
            <Grid container sx={{ height: "full", mt: "90px" }}>
                <Grid
                    item
                    xs={12}
                    lg={5}
                    xl={6}
                    sx={{
                        position: "relative",
                        display: { xs: "none", lg: "flex" },
                        alignItems: "end",
                        height: { xs: "32rem", lg: "100%" },
                    }}
                >
                    <BackgroundImage
                        src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/452104527_474641188623178_4279285114250487564_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=o39f9EUyP1gQ7kNvgEa6H-B&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDeVsqbMdzwmDwoaExXbpKatfhqQxkponG6vy_glNNQIA&oe=66A7A43C"
                        alt=""
                    />

                </Grid>

                <MainContent>
                    <FormContainer>
                        <Container maxWidth="sm">
                            <Typography
                                component="h1"
                                variant="h4"
                                align="center"
                                sx={{ mb: 4, fontSize: "24px", fontWeight: "bold" }}
                            >
                                Thông tin đặt hàng
                            </Typography>
                            <Form
                                onSubmit={handleSubmit}
                                validate={validate}
                                initialValues={formData}
                                render={({ handleSubmit, submitting }) => (
                                    <Box component="form" noValidate onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Field name="name">
                                                    {({ input, meta }) => (
                                                        <TextField
                                                            {...input}
                                                            required
                                                            fullWidth
                                                            id="name"
                                                            label="Name"
                                                            error={meta.touched && meta.error}
                                                            helperText={meta.touched && meta.error}
                                                            sx={{ fontSize: "15px!" }}
                                                            onChange={(e) => {
                                                                input.onChange(e);
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field name="phone">
                                                    {({ input, meta }) => (
                                                        <TextField
                                                            {...input}
                                                            required
                                                            fullWidth
                                                            id="phone"
                                                            label="phone"
                                                            error={meta.touched && meta.error}
                                                            helperText={meta.touched && meta.error}
                                                            onChange={(e) => {
                                                                input.onChange(e);
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field name="email">
                                                    {({ input, meta }) => (
                                                        <TextField
                                                            {...input}
                                                            required
                                                            fullWidth
                                                            id="email"
                                                            label=" email"
                                                            error={meta.touched && meta.error}
                                                            helperText={meta.touched && meta.error}
                                                            onChange={(e) => {
                                                                input.onChange(e);
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Field name="city">
                                                    {({ input, meta }) => (
                                                        <TextField
                                                            {...input}
                                                            required
                                                            fullWidth
                                                            id="city"
                                                            label="city"
                                                            error={meta.touched && meta.error}
                                                            helperText={meta.touched && meta.error}
                                                            onChange={(e) => {
                                                                input.onChange(e);
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Field name="stage">
                                                    {({ input, meta }) => (
                                                        <TextField
                                                            {...input}
                                                            required
                                                            fullWidth
                                                            id="stage"
                                                            label="stage"
                                                            error={meta.touched && meta.error}
                                                            helperText={meta.touched && meta.error}
                                                            onChange={(e) => {
                                                                input.onChange(e);
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field name="address">
                                                    {({ input, meta }) => (
                                                        <TextField
                                                            {...input}
                                                            fullWidth
                                                            id="address"
                                                            label="address"
                                                            error={meta.touched && meta.error}
                                                            helperText={meta.touched && meta.error}
                                                            onChange={(e) => {
                                                                input.onChange(e);
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </Grid>
                                        </Grid>
                                        <FormGroup sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "12px" }}>
                                            <FormControlLabel
                                                control={<Checkbox checked={paymentMethod === "COD"} onChange={handlePaymentMethodChange} />}
                                                label="COD"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={paymentMethod === "Transfer"}
                                                        onChange={handlePaymentMethodChange}
                                                    />
                                                }
                                                label="Chuyển khoản"
                                            />
                                        </FormGroup>
                                        {paymentMethod === "Transfer" && (
                                            <Box sx={{ mt: 2, textAlign: "center" }}>
                                                <Typography sx={{ mb: "12px", fontWeight: 600 }}>
                                                    Vui lòng chuyển khoản vào số tài khoản ở dưới
                                                </Typography>
                                                <img
                                                    src="../src/assets/images/IMG_2273.JPG"
                                                    style={{ width: "200px", height: "200px", objectFit: "contain" }}
                                                    alt=""
                                                />
                                            </Box>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            disabled={submitting}
                                            sx={{
                                                width: { xs: "300px", sm: "300px", lg: "100%" },
                                                mt: "12px",
                                                backgroundColor: "#FF5B26",
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                component="p"
                                                color="white"
                                                py={1}
                                                px={4}

                                            >
                                                Thanh toán
                                            </Typography>
                                        </Button>
                                    </Box>
                                )}
                            />
                        </Container>
                    </FormContainer>
                </MainContent>
            </Grid>
        </Section>
    );
};

export default Checkout;
