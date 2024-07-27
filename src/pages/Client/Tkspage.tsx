import React, { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ThankUPage() {
  useEffect(() => {
    // Kiểm tra trạng thái thanh toán thành công
    const orderSuccess = sessionStorage.getItem("orderSuccess");

    if (orderSuccess) {
      toast.success("Bạn đã đặt hàng thành công!");

      sessionStorage.removeItem("orderSuccess");
    }
  }, []);

  return (
    <>
      <div className="mx-auto w-[500px]">
        <img
          src="https://i.pinimg.com/736x/f8/9b/1c/f89b1c7d38d8fc67d7199a11a10234cd.jpg"
          alt=""
        />
        <span className="flex justify-center font-mono text-4xl mb-12">
          Cảm ơn bạn đã tin tưởng chúng tôi
        </span>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: { xs: "300px", sm: "300px", lg: "347px" },
            mx: "auto",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#FF5B26",
          }}
        >
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h6" component="p" color="white" py={1} px={4}>
              Quay trở về trang chủ
            </Typography>
          </Link>
        </Button>
      </div>
    </>
  );
}
