import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip,
} from "@mui/material";
import { ReactNode, useState } from "react";

interface DeleteCommentProps {
    children: ReactNode;
    handleDelete: () => void;
    title: string;
}

const ConfirmDelete: React.FC<DeleteCommentProps> = ({ children, handleDelete, title }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
        handleDelete();
        setOpen(false);
    };

    return (
        <>
            <Tooltip title="Xóa" sx={{ position: "absolute", top: 5, right: 5 }}>
                <IconButton onClick={handleClickOpen}>{children}</IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontSize: "2rem" }}>
                    {"DoubleV hỏi bạn."}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ fontSize: "1.6rem" }}>
                        {title}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={handleClose} sx={{ fontSize: "1.4rem" }}>
                        Hủy
                    </Button>
                    <Button color="error" onClick={handleConfirmDelete} autoFocus sx={{ fontSize: "1.4rem" }}>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmDelete;
