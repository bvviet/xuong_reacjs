import { Box, Button, Card, CardActions, CardContent, Grid, Rating, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { ProductsContext } from "../../contexts/ProductsContext";
import SlideShow from "../../components/client/SliceShow/SliceShow";
import FormatPrice from "../../components/client/FormatPrice/FormatPrice";

const HomeClient = () => {
    const context = useContext(ProductsContext);
    const { products } = context;       

    return (
        <>
            <Box>
                <SlideShow />
            </Box>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 2, sm: 4, md: 6 }}
                rowGap={{ xs: 2, sm: 2, md: 4 }}
                sx={{ margin: "30px 0" }}
            >
                {products.map((product) => (
                    <Grid item xs={3} key={product._id}>
                        <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}>
                            <Link to={`/detail/${product._id}`}>
                                <img
                                    style={{ height: 140, width: "100%", objectFit: "cover" }}
                                    src={product.image}
                                    title="green iguana"
                                />
                            </Link>
                            <Box sx={{ padding: "16px" }}>
                                <CardContent sx={{ padding: "0" }}>
                                    <Typography
                                        sx={{ color: "#1A162E", fontSize: "1.6rem", fontWeight: "500" }}
                                        gutterBottom
                                    >
                                        {product.name}
                                    </Typography>
                                    <Typography sx={{ color: "red", fontSize: "1.6rem", fontWeight: "500" }}>
                                        <FormatPrice price={product.price} />
                                    </Typography>
                                </CardContent>
                                <Typography sx={{ margin: "12px 0", fontSize: "1.5rem", color: "#9E9DA8" }}>
                                    {product.category?.name}
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
export default HomeClient;
