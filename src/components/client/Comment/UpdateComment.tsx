import { IconButton, Tooltip } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

interface UpdateCommentType {
    handleClickOpen: () => void;
}

const UpdateComment: React.FC<UpdateCommentType> = ({ handleClickOpen }) => {
    return (
        <Tooltip onClick={handleClickOpen} title="Chỉnh sửa" sx={{ position: "absolute", top: 5, right: 40 }}>
            <IconButton>
                <CreateIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
        </Tooltip>
    );
};
export default UpdateComment;
