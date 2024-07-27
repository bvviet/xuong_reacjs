import { Avatar, Box, Button, Grid, Rating, Typography } from "@mui/material";
import AddComment from "./AddComment";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import commentType from "../../../types/comment";
import { UserContext } from "../../../contexts/userContext";
import DeleteComment from "./DeleteComment";
import UpdateComment from "./UpdateComment";

const Comment = () => {
    const { id } = useParams();
    const { user, fetchUser } = useContext(UserContext);
    const [comments, setComments] = useState<commentType[]>([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const fetchComment = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/comment/${id}`);
            setComments(res.data.data);
            fetchUser();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchComment();
    }, [id, fetchUser]);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "20px 0",
                }}
            >
                <Typography sx={{ fontWeight: "500", fontSize: "2.1rem" }}>Bình luận</Typography>
                <Button sx={{ fontSize: "1.2rem" }} variant="outlined" onClick={handleClickOpen}>
                    Gửi đánh giá của bạn
                </Button>
                <AddComment handleClose={handleClose} open={open} fetchComment={fetchComment} />
            </div>
            <Grid container spacing={3}>
                {comments.map((item) => (
                    <Grid item xs={12} sm={6} md={3} key={item._id}>
                        <Box
                            sx={{
                                background: "#FAFAFD",
                                padding: "30px",
                                borderRadius: "16px",
                                position: "relative",
                            }}
                        >
                            {user?._id !== undefined && item.userId._id === user._id.toString() && (
                                <>
                                    <DeleteComment commentId={item._id} fetchComment={fetchComment} />
                                    <UpdateComment handleClickOpen={handleClickOpen} />
                                </>
                            )}

                            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <Avatar
                                    alt={`${item.userId.username}`}
                                    src="https://cdn.punchng.com/wp-content/uploads/2024/04/29120223/Thiago-Silva-2.jpeg"
                                />
                                <Box>
                                    <Typography sx={{ fontSize: "2rem", fontWeight: "500" }}>
                                        {item.userId.username}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            marginTop: "2px",
                                            fontSize: "1.6rem",
                                            fontWeight: "400",
                                            maxWidth: "267px",
                                            color: "#1A162E",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {item.content}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ marginTop: "10px" }}>
                                <Rating
                                    sx={{ fontSize: "2.2rem" }}
                                    name="read-only"
                                    value={item.rating}
                                    precision={0.5}
                                    readOnly
                                />
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
export default Comment;
