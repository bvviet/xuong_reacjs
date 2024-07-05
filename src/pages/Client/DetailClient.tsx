import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Rating, Stack, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import phone from "../../assets/icons/phone.svg";
import { Link } from "react-router-dom";

const DetailClient = () => {
    return (
        <>
            <Stack direction="row" spacing={8} sx={{ margin: "130px 0" }}>
                <Box>
                    <img
                        src="https://cdn.authentic-shoes.com/wp-content/uploads/2024/02/Giay-Nike-Air-Jordan-4-Retro-Bred-Reimagined-FV5029%E2%80%91006-2-768x510.png"
                        alt=""
                        style={{
                            border: "solid 1px #eee",
                            borderRadius: "12px",
                            opacity: "1",
                            width: "583px",
                            height: "387px",
                        }}
                    />
                </Box>
                <Box>
                    <Typography sx={{ fontSize: "1.4rem", color: "#288ad6" }}>Air Jordan 4</Typography>
                    <Typography sx={{ fontSize: "1.8rem", padding: "10px 0" }}>
                        Giày Nike Air Jordan 4 Retro ‘Bred Reimagined’ FV5029-006
                    </Typography>
                    <Rating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.1}
                        readOnly
                        size="large"
                        sx={{ marginTop: "10px" }}
                    />
                    <Typography sx={{ fontSize: "1.8rem", padding: "10px 0", fontWeight: "700" }}>
                        7,500,000 ₫
                    </Typography>

                    <Stack direction="row" spacing={3}>
                        <Button variant="outlined">Thêm vào giỏ hàng</Button>
                        <Button variant="contained" endIcon={<ShoppingCartIcon />} sx={{ background: "#FF5B26" }}>
                            Mua ngay
                        </Button>
                    </Stack>

                    <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                            border: "1px dashed #CCC",
                            borderRadius: "20px",
                            width: "98%",
                            margin: "20px 0",
                            padding: "23px",
                        }}
                        spacing={4}
                    >
                        <Stack>
                            <img src={phone} alt="" style={{ width: "50px" }} />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography sx={{ fontSize: "1.6rem", fontWeight: "500" }}>
                                Gọi ngay để có giá tốt
                            </Typography>
                            <Typography sx={{ fontSize: "1.6rem", fontWeight: "500" }}>
                                Hotline HN : 0984918486 - 0785499555 - Xuân Phương, Nam Từ Liêm
                            </Typography>
                            <Typography sx={{ fontSize: "1.6rem", fontWeight: "500" }}>
                                Hotline BG : 0786665444 - Lục Ngạn, Bắc Giang
                            </Typography>
                            <Typography sx={{ fontSize: "1.4rem", fontWeight: "400", fontStyle: "italic" }}>
                                Tổng đài hoạt động từ 10h00 - 22h00 mỗi ngày
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>

            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 2, sm: 4, md: 6 }}
                rowGap={{ xs: 2, sm: 2, md: 4 }}
                sx={{ margin: "30px 0" }}
            >
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}>
                        <Link to="#">
                            <img
                                style={{ height: 140, width: "100%", objectFit: "cover" }}
                                src="https://cdn.authentic-shoes.com/wp-content/uploads/2024/02/Giay-Nike-Air-Jordan-4-Retro-Bred-Reimagined-FV5029%E2%80%91006-2-768x510.png"
                                title="green iguana"
                            />
                        </Link>
                        <Box sx={{ padding: "16px" }}>
                            <CardContent sx={{ padding: "0" }}>
                                <Typography
                                    sx={{ color: "#1A162E", fontSize: "1.6rem", fontWeight: "500" }}
                                    gutterBottom
                                >
                                    Coffee Beans - Espresso Arabica and Robusta Beans
                                </Typography>
                                <Typography sx={{ color: "red", fontSize: "1.6rem", fontWeight: "500" }}>
                                    120.000đ
                                </Typography>
                            </CardContent>
                            <Typography sx={{ margin: "12px 0", fontSize: "1.5rem", color: "#9E9DA8" }}>
                                Điện thoại
                            </Typography>
                            <CardActions sx={{ display: "flex", justifyContent: "space-between", padding: "0" }}>
                                <Rating name="read-only" value={3.5} precision={0.1} readOnly />
                                <Button sx={{ fontSize: "1.1rem" }}>Add to card</Button>
                            </CardActions>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}>
                        <Link to="#">
                            <img
                                style={{ height: 140, width: "100%", objectFit: "cover" }}
                                src="https://cdn.authentic-shoes.com/wp-content/uploads/2024/02/Giay-Nike-Air-Jordan-4-Retro-Bred-Reimagined-FV5029%E2%80%91006-2-768x510.png"
                                title="green iguana"
                            />
                        </Link>
                        <Box sx={{ padding: "16px" }}>
                            <CardContent sx={{ padding: "0" }}>
                                <Typography
                                    sx={{ color: "#1A162E", fontSize: "1.6rem", fontWeight: "500" }}
                                    gutterBottom
                                >
                                    Coffee Beans - Espresso Arabica and Robusta Beans
                                </Typography>
                                <Typography sx={{ color: "red", fontSize: "1.6rem", fontWeight: "500" }}>
                                    120.000đ
                                </Typography>
                            </CardContent>
                            <Typography sx={{ margin: "12px 0", fontSize: "1.5rem", color: "#9E9DA8" }}>
                                Điện thoại
                            </Typography>
                            <CardActions sx={{ display: "flex", justifyContent: "space-between", padding: "0" }}>
                                <Rating name="read-only" value={3.5} precision={0.1} readOnly />
                                <Button sx={{ fontSize: "1.1rem" }}>Add to card</Button>
                            </CardActions>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}>
                        <Link to="#">
                            <img
                                style={{ height: 140, width: "100%", objectFit: "cover" }}
                                src="https://cdn.authentic-shoes.com/wp-content/uploads/2024/02/Giay-Nike-Air-Jordan-4-Retro-Bred-Reimagined-FV5029%E2%80%91006-2-768x510.png"
                                title="green iguana"
                            />
                        </Link>
                        <Box sx={{ padding: "16px" }}>
                            <CardContent sx={{ padding: "0" }}>
                                <Typography
                                    sx={{ color: "#1A162E", fontSize: "1.6rem", fontWeight: "500" }}
                                    gutterBottom
                                >
                                    Coffee Beans - Espresso Arabica and Robusta Beans
                                </Typography>
                                <Typography sx={{ color: "red", fontSize: "1.6rem", fontWeight: "500" }}>
                                    120.000đ
                                </Typography>
                            </CardContent>
                            <Typography sx={{ margin: "12px 0", fontSize: "1.5rem", color: "#9E9DA8" }}>
                                Điện thoại
                            </Typography>
                            <CardActions sx={{ display: "flex", justifyContent: "space-between", padding: "0" }}>
                                <Rating name="read-only" value={3.5} precision={0.1} readOnly />
                                <Button sx={{ fontSize: "1.1rem" }}>Add to card</Button>
                            </CardActions>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};
export default DetailClient;
