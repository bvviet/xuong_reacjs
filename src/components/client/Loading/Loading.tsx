import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface LoadingProps {
    isShow: boolean;
}

export default function Loading({ isShow }: LoadingProps) {
    return (
        <>
            {isShow && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: 9999,
                        backgroundColor: "#717070",
                        opacity: 0.6,
                    }}
                >
                    <CircularProgress color="inherit" />
                </Box>
            )}
        </>
    );
}
