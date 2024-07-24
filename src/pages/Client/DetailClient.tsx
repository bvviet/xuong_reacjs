import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    Rating,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useParams } from "react-router-dom";
import axios from "axios";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/system";
import { ProductsContext } from "../../contexts/ProductsContext";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartItem, IProduct, ProductCart } from "../../types/products";
import FormatPrice from "../../components/client/FormatPrice/FormatPrice";
import { useCart } from "../../contexts/CartContext";
import phone from "../../assets/icons/phone.svg";

import Comment from "../../components/client/Comment";
import AddFavorite from "./Favorite/AddFavorite";

// Tạo styled component cho thẻ ul
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UlCustom = styled("ul")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "50px",
    background: "#f0f0f0",
    padding: "15px 40px",
    "& li": {
        cursor: "pointer",
        padding: "8px 16px",
    },
}));

const DetailClient = () => {
    const [product, setProduct] = useState<IProduct | undefined>(undefined);
    const { id } = useParams<{ id: string | undefined }>();
    const [currentTab, setCurrentTab] = useState("description");

    const context = useContext(ProductsContext);
    const { products } = context;
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const { setCart } = useCart();

    const handleAddToCart = (product: ProductCart) => {
        if (quantity <= 0) return;

        // Tạo đối tượng sản phẩm chỉ với các thuộc tính cần thiết
        const productToSave: ProductCart = {
            name: product.name,
            _id: product._id,
            price: product.price,
            image: product.image,
            category: product.category,
        };

        // Lấy dữ liệu giỏ hàng từ Local Storage
        const cartStorage = localStorage.getItem("carts") || "[]";
        const carts = JSON.parse(cartStorage);

        // Tìm sản phẩm trong giỏ hàng
        const findItem = carts.findIndex((item: CartItem) => item.product._id === productToSave._id);

        // Cập nhật số lượng sản phẩm
        if (findItem !== -1) {
            carts[findItem].quantity += quantity;
        } else {
            const newCartItem: CartItem = { product: productToSave, quantity };
            carts.push(newCartItem);
        }

        // Lưu giỏ hàng vào Local Storage
        localStorage.setItem("carts", JSON.stringify(carts));
        console.log(carts);

        // Cập nhật trạng thái giỏ hàng
        setCart(carts.length);
    };
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
                        <FormatPrice price={product?.price} />
                    </Typography>
                    <Grid
                        sx={{
                            marginBottom: "12px",
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
                                onClick={handleDecrement}
                                sx={{
                                    padding: "2px",
                                }}
                            >
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                            <TextField
                                type="number"
                                value={quantity}
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
                                onClick={handleIncrement}
                                sx={{
                                    padding: "2px",
                                }}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Grid>

                    <Stack direction="row" spacing={3}>
                        <Button variant="outlined" onClick={() => product && handleAddToCart(product)}>
                            Thêm vào giỏ hàng
                        </Button>
                        <Button variant="contained" endIcon={<ShoppingCartIcon />} sx={{ background: "#FF5B26" }}>
                            Mua ngay
                        </Button>

                        <AddFavorite productId={id!} />
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
                            <Typography
                                sx={{
                                    fontSize: "1.4rem",
                                    fontWeight: "400",
                                    fontStyle: "italic",
                                }}
                            >
                                Tổng đài hoạt động từ 10h00 - 22h00 mỗi ngày
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>

            {/* Bình luận và mô tả */}
            <Stack direction="row" spacing={8}></Stack>
            <Box>
                <UlCustom>
                    <li
                        style={{ background: currentTab === "description" ? "#fff" : "" }}
                        onClick={() => setCurrentTab("description")}
                    >
                        Mô tả
                    </li>
                    <li
                        style={{ background: currentTab === "comments" ? "#fff" : "" }}
                        onClick={() => setCurrentTab("comments")}
                    >
                        Bình luận
                    </li>
                </UlCustom>
            </Box>
            <Box sx={{ margin: "10px 0" }}>
                {currentTab === "description" && (
                    <div>
                        <Typography variant="h5" sx={{ fontWeight: "500" }}>
                            Mô tả sản phẩm
                        </Typography>
                        <Typography sx={{ fontSize: "1.4rem" }}>{product?.description}</Typography>
                    </div>
                )}
                {currentTab === "comments" && (
                    <div>
                        <Comment />
                    </div>
                )}
            </Box>

            {/* Tất cả sản phẩm */}
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
                                        sx={{
                                            color: "#1A162E",
                                            fontSize: "1.6rem",
                                            fontWeight: "500",
                                        }}
                                        gutterBottom
                                    >
                                        {value.name}
                                    </Typography>
                                    <Typography sx={{ color: "red", fontSize: "1.6rem", fontWeight: "500" }}>
                                        <FormatPrice price={value.price} />
                                    </Typography>
                                </CardContent>
                                <Typography
                                    sx={{
                                        margin: "12px 0",
                                        fontSize: "1.5rem",
                                        color: "#9E9DA8",
                                    }}
                                >
                                    {value.category?.name}
                                </Typography>
                                <CardActions
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "0",
                                    }}
                                >
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
