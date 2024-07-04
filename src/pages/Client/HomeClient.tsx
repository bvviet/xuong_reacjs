import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Rating, Typography } from "@mui/material";
import card1 from "../../assets/images/card1.png";
import { Link } from "react-router-dom";
import SlideShow from "../../components/client/SliceShow/SliceShow";

const HomeClient = () => {
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
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}>
                        <Link to="#">
                            <CardMedia sx={{ height: 140 }} image={card1} title="green iguana" />
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
                            <CardMedia sx={{ height: 140 }} image={card1} title="green iguana" />
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
                            <CardMedia sx={{ height: 140 }} image={card1} title="green iguana" />
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
                            <CardMedia sx={{ height: 140 }} image={card1} title="green iguana" />
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
                            <CardMedia sx={{ height: 140 }} image={card1} title="green iguana" />
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
export default HomeClient;
