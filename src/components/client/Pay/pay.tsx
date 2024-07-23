import { Box, Button, Typography, Stack } from "@mui/material";

const OrderSummary = () => {
  return (
    <Box className="max-sm:hidden sm:w-[300px] lg:w-full">
      <Box
        sx={{
          backgroundColor: "#FFF9E5",
          borderRadius: "24px",
          width: { xs: "300px", sm: "300px", lg: "100%" },
          padding: "24px",
        }}
      >
        <Box ml={2}>
          <Typography variant="h4" component="p" mx={2} mb={4} fontWeight={550}>
            Thanh toán
          </Typography>
          <Stack spacing={2} mx={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography fontSize={14} fontWeight={550}>
                Giá tổng sản phẩm:
              </Typography>
              <Typography fontSize={14}>$2</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography fontSize={14} fontWeight={550}>
                Phí vận chuyển:
              </Typography>
              <Typography fontSize={14}>$2</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" pb={4}>
              <Typography className="name_cart" fontWeight={550} fontSize={14}>
                Tổng tiền phải trả:
              </Typography>
              <Typography className="name_cart" fontSize={14}>
                $4
              </Typography>
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
          <Typography variant="h6" component="p" color="white" py={1} px={4}>
            Check out
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default OrderSummary;
