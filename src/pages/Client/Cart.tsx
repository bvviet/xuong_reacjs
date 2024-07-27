import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FormatPrice from "../../components/client/FormatPrice/FormatPrice";
import { CartItem } from "../../types/products";
import { LoadingContext } from "../../contexts/LoadingContext";
import { UserContext } from "../../contexts/userContext";
import { useTotalPrice } from "../../contexts/TotalPriceContext"; // Use custom hook
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// Styled component
const Wrapper = styled(Stack)({
  width: 900,
});

export default function Cart() {
  const shippingFee = 10000;
  const [carts, setCarts] = useState<CartItem[]>([]);
  const loadingContext = useContext(LoadingContext);
  const { user } = useContext(UserContext);
  const { totalPrice, setTotalPrice } = useTotalPrice(); // Use the custom hook
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      const cartKey = `cart_${user._id}`;
      const cartStorage = localStorage.getItem(cartKey) || "[]";
      const storedCarts = JSON.parse(cartStorage);
      setCarts(storedCarts);
      calculateTotalPrice(storedCarts);
    }
  }, [user]);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCarts = [...carts];
    updatedCarts[index].quantity = newQuantity;
    setCarts(updatedCarts);
    if (user) {
      const cartKey = `cart_${user._id}`;
      localStorage.setItem(cartKey, JSON.stringify(updatedCarts));
    }
    calculateTotalPrice(updatedCarts);
  };

  const handleIncrement = (index: number) => {
    handleQuantityChange(index, carts[index].quantity + 1);
  };

  const handleDecrement = (index: number) => {
    handleQuantityChange(index, carts[index].quantity - 1);
  };

  const calculateTotalPrice = (cartItems: CartItem[]) => {
    const totalCartPrice = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const total = cartItems.length > 0 ? totalCartPrice + shippingFee : 0;
    setTotalPrice(total);
  };

  const handleOpenDialog = (index: number) => {
    setDeleteIndex(index);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteIndex(null);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      handleDeleteItem(deleteIndex);
      handleCloseDialog();
    }
  };

  const handleDeleteItem = (index: number) => {
    try {
      loadingContext?.setIsLoading(true);
      const updatedCarts = carts.filter((_, i) => i !== index);
      setCarts(updatedCarts);
      if (user) {
        const cartKey = `cart_${user._id}`;
        localStorage.setItem(cartKey, JSON.stringify(updatedCarts));
      }
      toast.success("Xóa thành công", {
        position: "top-right",
        autoClose: 1000,
      });
      calculateTotalPrice(updatedCarts);
    } catch (error) {
      console.log(error);
    } finally {
      loadingContext?.setIsLoading(false);
    }
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
          <Typography sx={{ fontSize: "24px", fontWeight: "600" }}>
            Giỏ hàng
          </Typography>

          {carts.length === 0 ? (
            <Typography
              sx={{
                textAlign: "center",
                marginTop: "20px",
                fontSize: "18px",
                color: "gray",
                width: "full",
              }}
            >
              Giỏ hàng của bạn hiện đang trống
            </Typography>
          ) : (
            <>
              {carts.map((item, index) => (
                <Box key={index}>
                  <Grid
                    display={"flex"}
                    alignItems={"center"}
                    style={{ paddingTop: "12px", marginLeft: "24px" }}
                  >
                    <Grid
                      item
                      xs
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <IconButton onClick={() => handleOpenDialog(index)}>
                        <DeleteIcon sx={{ fontSize: "2rem" }} />
                      </IconButton>
                      <img
                        src={item.product.image}
                        alt="Product"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "8px",
                        }}
                      />
                      <Box>
                        <Typography fontWeight={600} fontSize={18}>
                          {item.product.name}
                        </Typography>
                        <Typography color={"gray"}>
                          {item.product.category.name}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid
                      sx={{
                        border: "1px solid gray",
                        borderRadius: "4px",
                        height: "30px",
                        width: "115px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                          onClick={() => handleDecrement(index)}
                          sx={{
                            padding: "2px",
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(index, Number(e.target.value))
                          }
                          inputProps={{
                            min: 1,
                            style: {
                              textAlign: "center",
                              fontSize: "12px",
                              padding: "0",
                            },
                          }}
                          sx={{
                            width: "40px",
                            "& .MuiOutlinedInput-root": {
                              padding: "0",
                              "& fieldset": {
                                border: "none",
                              },
                            },
                          }}
                        />
                        <IconButton
                          onClick={() => handleIncrement(index)}
                          sx={{
                            padding: "2px",
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Grid>

                    <Grid item xs style={{ textAlign: "center", color: "red" }}>
                      <FormatPrice price={item.product.price * item.quantity} />
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{ margin: "12px 24px", backgroundColor: "gray" }}
                  />
                </Box>
              ))}
            </>
          )}
        </Wrapper>

        <Box className="max-sm:hidden sm:w-[300px] lg:w-[400px]">
          <Box
            sx={{
              backgroundColor: "#FFF9E5",
              borderRadius: "24px",
              width: { xs: "300px", sm: "300px", lg: "100%" },
              padding: "24px",
            }}
          >
            <Typography fontSize={24} fontWeight={600} mb={2}>
              Thanh toán
            </Typography>
            <Box ml={2}>

              <Stack spacing={2} mx={2}>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontSize={14} fontWeight={550}>
                    Tạm tính:
                  </Typography>
                  <FormatPrice price={carts.reduce((total, item) => total + item.product.price * item.quantity, 0)} />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontSize={14} fontWeight={550}>
                    Phí vận chuyển:
                  </Typography>
                  <FormatPrice price={shippingFee} />
                </Box>

                <Box display="flex" justifyContent="space-between" pb={4}>
                  <Typography className="name_cart" fontWeight={550} fontSize={14} sx={{ color: "red" }}>
                    Tổng tiền phải trả:
                  </Typography>
                  <FormatPrice price={totalPrice} sx={{ color: "red", fontWeight: 700 }} />
                </Box>
              </Stack>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: { xs: "300px", sm: "300px", lg: "347px" },
                mx: "auto",
                display: "flex",
                justifyContent: "center",
                borderRadius: "24px",
                backgroundColor: "#FF5B26",
              }}
            >
              <Link to={"/checkout"}>
                <Typography variant="h6" component="p" color="white" py={1} px={4}>
                  Thanh toán
                </Typography>
              </Link>
            </Button>

          </Box>
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy bỏ
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
