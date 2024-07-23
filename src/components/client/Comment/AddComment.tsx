import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Typography, TextField, Box, Rating } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingContext } from "../../../contexts/LoadingContext";

interface AddCommentProps {
    open: boolean;
    handleClose: () => void;
}

interface IFormInput {
    content: string;
    rating: number;
}

const AddComment: React.FC<AddCommentProps> = ({ handleClose, open }) => {
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const { setIsLoading } = useContext(LoadingContext) || {};

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            if (setIsLoading) setIsLoading(true);
            const { content, rating } = data;
            const res = await axios.post("http://localhost:3000/comment", {
                userId: user?._id,
                productId: id,
                content,
                rating,
            });

            if (res.status === 200) {
                handleClose();
                reset(); // <-- Reset form sau khi gửi thành công
                toast.success("Thêm bình luận thành công", {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
        } catch (error) {
            let errorMessage = "Đã xảy ra lỗi";
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    errorMessage = error.response.data.message || errorMessage;
                    if (error.response.status === 404) {
                        errorMessage = "API hiện đang bị lỗi";
                    }
                } else if (error.request) {
                    errorMessage = "Vui lòng kiểm tra lại mạng!";
                } else if (error.message === "Network Error") {
                    errorMessage = "Vui lòng kiểm tra lại kết nối mạng!";
                }
            } else {
                console.log("Lỗi khác xảy ra:", (error as Error).message);
            }
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 2000,
            });
        } finally {
            if (setIsLoading) setIsLoading(false);
        }
    };

    return (
        <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle sx={{ m: 0, p: 2, fontSize: "2rem" }} id="customized-dialog-title">
                Đánh giá
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 16,
                        top: 16,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon sx={{ fontSize: "2rem" }} />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="h6" sx={{ marginBottom: 3, fontSize: "1.8rem" }}>
                    Viết đánh giá mới ✏️
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register("content", { required: "Trường này không được bỏ trống." })}
                        fullWidth
                        multiline
                        rows={6}
                        variant="outlined"
                        placeholder="Nhập đánh giá của bạn ở đây..."
                        sx={{
                            marginBottom: 2,
                            "& .MuiOutlinedInput-input": {
                                fontSize: "1.6rem",
                            },
                            "& .MuiInputLabel-root": {
                                fontSize: "1.4rem",
                            },
                        }}
                    />
                    {errors.content && (
                        <p style={{ color: "red" }} role="alert">
                            {errors.content.message}
                        </p>
                    )}
                    <Box>
                        <Typography variant="h6" sx={{ fontSize: "1.8rem", margin: "20px 0 5px 0" }}>
                            Đánh giá ⭐
                        </Typography>
                        <Controller
                            name="rating"
                            control={control}
                            defaultValue={3.5}
                            render={({ field }) => (
                                <Rating
                                    {...field}
                                    value={Number(field.value)}
                                    onChange={(_, value) => field.onChange(value)}
                                    sx={{ fontSize: "2rem", marginLeft: "-2px" }}
                                    precision={0.5}
                                />
                            )}
                        />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
                        <Button
                            color="error"
                            autoFocus
                            onClick={handleClose}
                            variant="outlined"
                            sx={{ fontSize: "1rem", padding: "6px 20px" }}
                        >
                            Hủy
                        </Button>
                        <Button type="submit" variant="contained">
                            Gửi đánh giá
                        </Button>
                    </Box>
                </form>
            </DialogContent>
        </BootstrapDialog>
    );
};

export default AddComment;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        width: "550px",
        maxWidth: "90vw",
    },
    "& .MuiDialogContent-root": {
        padding: theme.spacing(3),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(3),
    },
}));
