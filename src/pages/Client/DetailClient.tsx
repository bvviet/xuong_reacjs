import { Box, Button, Card, CardActions, CardContent, Grid, Rating, Stack, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useParams } from "react-router-dom";
import axios from "axios";

import { ProductsContext } from "../../contexts/ProductsContext";
import phone from "../../assets/icons/phone.svg";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IProduct } from "../../types/products";

const DetailClient = () => {
    const [product, setProduct] = useState<IProduct | undefined>(undefined);
    const { id } = useParams<{ id: string }>();
    const context = useContext(ProductsContext);
    const { products } = context;

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                if (id) {
                    const response = await axios.get(`http://localhost:3000/products/${id}`);
                    setProduct(response.data);
                }
            } catch (error) {
                console.error("Error fetching product detail:", error);
            }
        };
        fetchDetail();
    }, [id]);

    return (
        <>
            <Stack direction="row" spacing={8} sx={{ margin: "130px 0" }}>
                <Box>
                    <img
                        src={product?.image}
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
                    <Typography sx={{ fontSize: "1.4rem", color: "#288ad6" }}>{product?.category.name}</Typography>
                    <Typography sx={{ fontSize: "1.8rem", padding: "10px 0" }}>{product?.name}</Typography>
                    <Rating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.1}
                        readOnly
                        size="large"
                        sx={{ marginTop: "10px" }}
                    />
                    <Typography sx={{ fontSize: "1.8rem", padding: "10px 0", fontWeight: "700" }}>
                        {product?.price} ₫
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
                {products.map((value) => (
                    <Grid item xs={3} key={value._id}>
                        <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}>
                            <Link to={`/detail/${value._id}`}>
                                <img
                                    style={{ height: 140, width: "100%", objectFit: "cover" }}
                                    src={value.image}
                                    title="green iguana"
                                />
                            </Link>
                            <Box sx={{ padding: "16px" }}>
                                <CardContent sx={{ padding: "0" }}>
                                    <Typography
                                        sx={{ color: "#1A162E", fontSize: "1.6rem", fontWeight: "500" }}
                                        gutterBottom
                                    >
                                        {value.name}
                                    </Typography>
                                    <Typography sx={{ color: "red", fontSize: "1.6rem", fontWeight: "500" }}>
                                        {value.price}đ
                                    </Typography>
                                </CardContent>
                                <Typography sx={{ margin: "12px 0", fontSize: "1.5rem", color: "#9E9DA8" }}>
                                    {value.category?.name}
                                </Typography>
                                <CardActions sx={{ display: "flex", justifyContent: "space-between", padding: "0" }}>
                                    <Rating name="read-only" value={3.5} precision={0.1} readOnly />
                                    <Button sx={{ fontSize: "1.1rem" }}>Add to card</Button>
                                </CardActions>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
export default DetailClient;
