import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

interface DeleteCommentProps {
    commentId: string;
}

const DeleteComment: React.FC<DeleteCommentProps> = ({ commentId }) => {
    const handleDeleteComment = async () => {
        try {
            const res = await axios.delete(`http://localhost:3000/comment/${commentId}`);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Tooltip title="Xóa" sx={{ position: "absolute", top: 5, right: 5 }}>
            <IconButton onClick={handleDeleteComment}>
                <DeleteIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
        </Tooltip>
    );
};
export default DeleteComment;
