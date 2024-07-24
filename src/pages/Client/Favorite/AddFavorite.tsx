import { Badge, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/userContext";
import axios from "axios";
import { FavoriteContext } from "../../../contexts/favoriteContext";
import { toast } from "react-toastify";
import { LoadingContext } from "../../../contexts/LoadingContext";

interface AddFavoriteProps {
    productId: string;
}

const AddFavorite: React.FC<AddFavoriteProps> = ({ productId }) => {
    const { user } = useContext(UserContext);
    const context = useContext(FavoriteContext);
    const loadingContext = useContext(LoadingContext);
    const [messages, setMessages] = useState("");
    useEffect(() => {
        if (messages) {
            toast.error(messages, {
                position: "top-right",
                autoClose: 1500,
            });
            setMessages("");
        }
    }, [messages]);

    const handleAddFavorite = async () => {
        try {
            loadingContext?.setIsLoading(true);
            const res = await axios.post("http://localhost:3000/favorite", {
                userId: user?._id,
                productId: productId,
            });
            context?.fetchFavorites();
            if (res.status == 200) {
                toast.success("Thêm vào danh sách yêu thích thành công!", {
                    position: "top-right",
                    autoClose: 1200,
                });
            }
        } catch (error) {
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
            loadingContext?.setIsLoading(false);
        }
    };
    return (
        <IconButton onClick={handleAddFavorite} color="inherit" sx={{ marginRight: 2, fontSize: "3rem" }}>
            <Badge color="primary">
                <FavoriteIcon color="secondary" sx={{ fontSize: "inherit" }} />
            </Badge>
        </IconButton>
    );
};
export default AddFavorite;
