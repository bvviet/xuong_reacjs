import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import ConfirmDelete from "../ConfirmDelete";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../../contexts/LoadingContext";

interface DeleteCommentProps {
    commentId: string;
    fetchComment: () => void;
}

const DeleteComment: React.FC<DeleteCommentProps> = ({ commentId, fetchComment }) => {
    const [messages, setMessages] = useState("");
    const loadingContext = useContext(LoadingContext);

    useEffect(() => {
        if (messages) {
            toast.error(messages, {
                position: "top-right",
                autoClose: 1500,
            });
            setMessages("");
        }
    }, [messages]);

    const handleDeleteComment = async () => {
        try {
            loadingContext?.setIsLoading(true);
            const res = await axios.delete(`http://localhost:3000/comment/${commentId}`);
            if (res.status === 200) {
                fetchComment();
                toast.success("Xóa bình luận thành công", {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
        } catch (error: unknown) {
            console.log(error);
        } finally {
            loadingContext?.setIsLoading(false);
        }
    };

    return (
        <>
            <ConfirmDelete title="Bạn chắn chắn muốn xóa bình luận này chứ❓" handleDelete={handleDeleteComment}>
                <DeleteIcon sx={{ fontSize: "2rem" }} />
            </ConfirmDelete>
        </>
    );
};

export default DeleteComment;
