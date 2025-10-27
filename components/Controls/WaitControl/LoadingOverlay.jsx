import React from "react";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

const LoadingOverlay = () => {
    const { isLoading, message } = useSelector((state) => state.loading);

    return (
        <Backdrop
            open={isLoading}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                color: "#fff",
                flexDirection: "column",
            }}
        >
            <CircularProgress color="inherit" />
            <Typography variant="h6" sx={{ mt: 2 }}>
                {message}
            </Typography>
        </Backdrop>
    );
};

export default LoadingOverlay;