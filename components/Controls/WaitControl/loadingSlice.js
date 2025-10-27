import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        isLoading: false,
        message: "Cargando...",
    },
    reducers: {
        showLoading: (state, action) => {
            state.isLoading = true;
            state.message = typeof action.payload === "string" ? action.payload : "Cargando...";
        },
        hideLoading: (state) => {
            state.isLoading = false;
            state.message = "";
        },
    },
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;