import { Alert, Snackbar } from "@mui/material";

type FlashProps = {
  isShow: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  onClose: () => void;
};

function Flash({ isShow, message, severity, onClose }: FlashProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isShow}
      onClose={onClose}
      autoHideDuration={1000}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Flash;
