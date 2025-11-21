import React from "react";
import { Typography, Box } from "@mui/material";

const Dashboard = () => {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Bienvenido al Dashboard
            </Typography>
            <Typography variant="body1">
                Aquí puedes ver el resumen de tu sistema Helpdesk, acceder a tickets, usuarios y más.
            </Typography>
        </Box>
    );
};

export default Dashboard;