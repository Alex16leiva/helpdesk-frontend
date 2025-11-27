import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "../../components/Controls/WaitControl/loadingSlice";
import authReducer from '../../features/auth/authSlice';
import controlsSlicer from "../../components/Controls/ReducerControl/controlsSlicer";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        loading: loadingReducer,
        controls: controlsSlicer
    },
});