import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCollapsed: false,
    showWaitControl: false,
};

const controlsSlicer = createSlice({
    name: "controls",
    initialState,
    reducers: {
        registerCollapse: (state, action) => {
            state.isCollapsed = action.payload;
        },
        registerWaitControl: (state, action) => {
            state.showWaitControl = action.payload;
        },
    },
});

export const { registerCollapse, registerWaitControl } = controlsSlicer.actions;
export default controlsSlicer.reducer;