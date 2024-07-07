import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";

type ConfirmDialogProps = {
  confirm: boolean;
  onConfirm: (confirm: boolean) => void;
  onDelete: () => void;
};

export default function ConfirmDialogCate({
  confirm,
  onConfirm,
  onDelete,
}: ConfirmDialogProps) {
  const handleClose = () => {
    onConfirm(false);
  };

  const handleAgree = () => {
    onConfirm(false);
    onDelete();
  };

  return (
    <Dialog
      open={confirm}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete Category"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this category?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonCancel onClick={handleClose}>Cancel</ButtonCancel>
        <ButtonOk onClick={handleAgree} autoFocus>
          OK
        </ButtonOk>
      </DialogActions>
    </Dialog>
  );
}

const ButtonOk = styled(Button)({
  background: "linear-gradient(45deg, #4CAF50 30%, #81C784 90%)",
  border: 0,
  borderRadius: 8,
  boxShadow: "0 3px 5px 2px rgba(76, 175, 80, .3)",
  color: "white",
  height: 38,
  padding: "0 12px",
  "&:hover": {
    background: "linear-gradient(45deg, #388E3C 30%, #66BB6A 90%)",
  },
});

const ButtonCancel = styled(Button)({
  backgroundColor: "#f44336",
  color: "#fff",
  borderRadius: 8,
  height: 38,
  padding: "0 12px",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
});
