import React from "react";
import { Backdrop, Box, Modal, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

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
            font-size: 1.6rem; /* Kích thước chữ khi nhập vào */
            padding: 15px; /* Khoảng cách giữa nội dung và viền input */
            height: auto; /* Chiều cao tự động theo nội dung */
            width: 100%; /* Chiều rộng tự động */
        }
    }
`;

interface RegisterProps {
    open: boolean;
    onClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ open, onClose }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
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
                    <ClearIcon fontSize="large" sx={{ cursor: "pointer" }} onClick={onClose} />
                </Stack>

                <Stack direction="column" justifyContent="center" alignItems="center" sx={{ marginTop: "35px" }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA2MSeKgctfF4s5UrZQTz03Vsnl9ke1tJniA&s"
                            alt=""
                            style={{width:"40px"}}
                        />
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, fontSize: "2.8rem", fontWeight: "700", lineHeight: "1.4", marginBottom: "12px" }}
                    >
                        Đăng ký tài khoản Double V
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

                    <form style={{ marginTop: "30px" }}>
                        <Stack spacing={3}>
                            <CustomTextField id="outlined-basic-1" label="Tên tài khoản" variant="outlined" />
                            <CustomTextField id="outlined-basic-2" label="Email" variant="outlined" />
                            <CustomTextField
                                id="outlined-basic-3"
                                label="Password"
                                type="password"
                                variant="outlined"
                            />
                        </Stack>
                    </form>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={"15px"}
                        sx={{ marginTop: "34px" }}
                    >
                        <Typography sx={{ fontSize: "1.4rem", lineHeight: "1.8" }}>
                            Bạn đã có tài khoản?
                            <Link
                                to={"#"}
                                style={{
                                    fontWeight: "500",
                                    color: "#f05123",
                                    textDecoration: "underline",
                                    marginLeft: "4px",
                                }}
                            >
                                Đăng nhập
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

export default Register;
