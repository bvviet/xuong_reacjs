import {
  Box,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import OrderSummary from "../../components/client/Pay/pay";

const Wrapper = styled(Stack)({
  width: 900,
});

export default function Cart() {
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "1280px",
          margin: "auto",
          display: "flex",
          paddingTop: "52px",
        }}
      >
        <Wrapper>
          {/* Cart Item */}
          <Typography sx={{ fontSize: "24px", fontWeight: "600" }}>
            Giỏ hàng
          </Typography>

          {/* First Cart Item */}
          <Grid
            display={"flex"}
            alignItems={"center"}
            style={{ paddingTop: "12px", marginLeft: "24px" }}
          >
            <Grid
              item
              xs
              style={{ display: "flex", alignItems: "center", gap: "16px" }}
            >
              <DeleteIcon />
              <img
                src="https://nld.mediacdn.vn/291774122806476800/2023/9/26/wp1923703-16956973098831607204119.jpg"
                alt="Product"
                style={{ width: "100px", height: "100px", borderRadius: "8px" }}
              />
              <Box>
                <Typography fontWeight={600} fontSize={18}>
                  Cà phê
                </Typography>
                <Typography color={"gray"}>Cà phê</Typography>
              </Box>
            </Grid>

            <Grid item xs style={{ textAlign: "center" }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <IconButton onClick={handleDecrement}>
                  <RemoveIcon />
                </IconButton>
                <TextField
                  type="number"
                  value={quantity}
                  inputProps={{
                    min: 1,
                    style: { textAlign: "center", fontSize: "12px" },
                  }}
                  sx={{
                    width: "80px",

                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
                <IconButton onClick={handleIncrement}>
                  <AddIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs style={{ textAlign: "center", color: "red" }}>
              <Typography fontWeight={600} fontSize={12}>
                25.000.000đ
              </Typography>
            </Grid>
          </Grid>

          {/* Divider */}
          <Divider sx={{ margin: "12px 24px", backgroundColor: "gray" }} />

          {/* Second Cart Item */}
          <Grid
            display={"flex"}
            alignItems={"center"}
            style={{ paddingTop: "12px", marginLeft: "24px" }}
          >
            <Grid
              item
              xs
              style={{ display: "flex", alignItems: "center", gap: "16px" }}
            >
              <DeleteIcon />
              <img
                src="https://nld.mediacdn.vn/291774122806476800/2023/9/26/wp1923703-16956973098831607204119.jpg"
                alt="Product"
                style={{ width: "100px", height: "100px", borderRadius: "8px" }}
              />
              <Box>
                <Typography fontWeight={600} fontSize={18}>
                  Cà phê
                </Typography>
                <Typography color={"gray"}>Cà phê</Typography>
              </Box>
            </Grid>

            <Grid item xs style={{ textAlign: "center" }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <IconButton onClick={handleDecrement}>
                  <RemoveIcon />
                </IconButton>
                <TextField
                  type="number"
                  value={quantity}
                  inputProps={{
                    min: 1,
                    style: { textAlign: "center", fontSize: "12px" },
                  }}
                  sx={{
                    width: "80px",

                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
                <IconButton onClick={handleIncrement}>
                  <AddIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs style={{ textAlign: "center", color: "red" }}>
              <Typography fontWeight={600} fontSize={12}>
                25.000.000đ
              </Typography>
            </Grid>
          </Grid>
        </Wrapper>
        <OrderSummary />
      </Box>
    </>
  );
}
