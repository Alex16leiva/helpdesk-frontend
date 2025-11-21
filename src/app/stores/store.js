import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "../../components/Controls/WaitControl/loadingSlice";
import authReducer from '../../features/auth/authSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        loading: loadingReducer,
    },
});