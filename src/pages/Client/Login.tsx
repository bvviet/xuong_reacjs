import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Backdrop, Box, Button, Modal, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoadingContext } from "../../contexts/LoadingContext";
import { UserContext } from "../../contexts/userContext";

interface LoginProps {
    handleOpenLogin: boolean;
    onCloseLogin: () => void;
    onSwitchToRegister: () => void;
}

interface IFormInput {
    email: string;
    password: string;
}

const Login: React.FC<LoginProps> = ({ handleOpenLogin, onCloseLogin, onSwitchToRegister }) => {
    const { fetchUser } = useContext(UserContext);
    const [messages, setMessages] = useState("");
    const context = useContext(LoadingContext);
    // Kiểm tra nếu context là undefined để tránh lỗi
    if (!context) {
        throw new Error("LoadingContext must be used within a LoadingProvider");
    }
    const { setIsLoading } = context;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
        mode: "onBlur",
    });

    useEffect(() => {
        if (messages) {
            toast.error(messages, {
                position: "top-right",
                autoClose: 2000,
            });
            setMessages("");
        }
    }, [messages]);

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);

        const handleLogin = async () => {
            try {
                setIsLoading(true);
                const response = await axios.post("http://localhost:3000/auth/login", data);
                console.log(response.data.user);
                if (response.status === 200) {
                    fetchUser();
                    toast.success("Đăng nhập thành công!", {
                        position: "top-right",
                        autoClose: 1500,
                    });
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    setTimeout(() => {
                        onCloseLogin();
                    }, 2500);
                }
            } catch (error: unknown) {
                let errorMessage = "";
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        errorMessage = `${error.response.data.message}`;
                        if (error.response?.status == 404) {
                            errorMessage = "API hiện đang bị lỗi";
                        }
                    } else if (error.request) {
                        errorMessage = "Vui lòng kiểm tra lại mạng!";
                    } else if (error.message === "Network Error") {
                        errorMessage = "Vui lòng kiểm tra lại kết nối mạng!";
                    } else {
                        errorMessage = `Lỗi khác từ Axios xảy ra:${error.message}`;
                    }
                    setMessages(errorMessage);
                } else {
                    console.log("Lỗi khác xảy ra:", (error as Error).message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        handleLogin();
    };

    return (
        <Modal
            open={handleOpenLogin}
            onClose={onCloseLogin}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Box sx={style}>
                <Stack direction="row" justifyContent="flex-end">
                    <ClearIcon fontSize="large" sx={{ cursor: "pointer" }} onClick={onCloseLogin} />
                </Stack>

                <Stack direction="column" justifyContent="center" alignItems="center" sx={{ marginTop: "0" }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA2MSeKgctfF4s5UrZQTz03Vsnl9ke1tJniA&s"
                            alt=""
                            style={{ width: "40px" }}
                        />
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, fontSize: "2.8rem", fontWeight: "700", lineHeight: "1.4", marginBottom: "12px" }}
                    >
                        Đăng nhập vào Double V
                    </Typography>
                    <Typography
                        sx={{
                            color: "#f33a58",
                            width: "min(400px, 90%)",
                            textAlign: "center",
                            fontSize: "1.4rem",
                        }}
                    >
                        Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử dụng chung sẽ bị khóa.
                    </Typography>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "20px" }}>
                        <Stack spacing={2}>
                            <CustomTextField
                                type="email"
                                {...register("email", { required: "Email không được để trống" })}
                                id="outlined-basic-2"
                                label="Email"
                                variant="outlined"
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : null}
                            />
                            <CustomTextField
                                {...register("password", { required: "Mật khẩu không được để trống" })}
                                id="outlined-basic-3"
                                label="Mật khẩu"
                                type="password"
                                variant="outlined"
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : null}
                            />
                        </Stack>
                        <Stack sx={{ marginTop: "20px", width: "100%" }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ borderRadius: "999px", padding: "13px", fontSize: "1.3rem" }}
                            >
                                Đăng nhập
                            </Button>
                        </Stack>
                    </form>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={"10px"}
                        sx={{ marginTop: "20px" }}
                    >
                        <Typography sx={{ fontSize: "1.4rem", lineHeight: "1.8" }}>
                            Bạn chưa có tài khoản?
                            <Link
                                to={"#"}
                                style={{
                                    fontWeight: "500",
                                    color: "#f05123",
                                    textDecoration: "underline",
                                    marginLeft: "4px",
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onCloseLogin();
                                    onSwitchToRegister();
                                }}
                            >
                                Đăng ký
                            </Link>
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "1.4rem",
                                fontWeight: "500",
                                color: "#f05123",
                                textDecoration: "underline",
                            }}
                        >
                            Quên mật khẩu?
                        </Typography>
                        <Typography
                            sx={{
                                width: "min(400px, 100%)",
                                textAlign: "center",
                                padding: "0 16px",
                                fontSize: "1.1rem",
                                color: "#666",
                            }}
                        >
                            Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với điều khoản sử dụng của
                            chúng tôi.
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
};

export default Login;

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "540px",
    height: "660px",
    background: "#ecf5fe",
    boxShadow: 24,
    p: 4,
    borderRadius: "16px",
    animationDuration: ".3s",
    overflowY: "auto",
};

const CustomTextField = styled(TextField)`
    && {
        & .MuiInputLabel-root {
            font-size: 1.3rem;
            font-weight: 500;
            color: #000;
        }
        & .MuiOutlinedInput-root {
            border-radius: 44px;
            width: 370px;
            background-color: #fff;
        }
        & label.Mui-focused {
            color: #1dbfaf;
        }
        & .MuiInput-underline:after {
            border-bottom-color: #1dbfaf;
        }
        & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: #1dbfaf;
        }
        & .MuiInputBase-input {
            font-size: 1.6rem;
            padding: 15px;
            height: auto;
            width: 100%;
        }
        & .MuiFormHelperText-root {
            /*helperText */
            margin-top: 9px;
            font-size: 1.4rem;
            color: #f33a58;
            margin-left: 8px;
            font-weight: 500;
            line-height: 1.5;
        }
    }
`;
