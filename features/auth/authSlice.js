import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    permisos: [],
    logged: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SignIn: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.permisos = action.payload.permisos;
            state.logged = true;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            state.permisos = [];
            state.logged = false;
        },
    },
});

export const { SignIn, logout } = authSlice.actions;
export default authSlice.reducer;
