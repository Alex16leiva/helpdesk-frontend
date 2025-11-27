import { styled } from "@mui/material"

export const StatusBadge = styled("span")(({ status }) => ({
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "white",
    backgroundColor:
        status === true
            ? "#2ecc71"
            : "#e74c3c",
}));