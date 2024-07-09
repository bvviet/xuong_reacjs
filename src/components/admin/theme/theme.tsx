import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontSize: 18, // Tăng kích thước phông chữ mặc định
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "13px",
        },
      },
    },
  },
});

export default theme;
