import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { CoreUtils } from '../utils/CoreUtils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RestClient } from '../api/RestClient';
import { SignIn } from '../features/auth/authSlice';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ userName: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { userName, password } = form;

        if (!userName || !password) {
            CoreUtils.notificationWarning('Please enter a valid userName');
            return;
        }

        const lastPath = localStorage.getItem('lastPath') || '/';

        RestClient.authenticate('user/login', { userName, password }).then(response => {
            if (!response.usuarioAutenticado) {
                CoreUtils.notificationWarning('Usuario no autenticado');
                return;
            }

            sessionStorage.access_token = response.token;
            sessionStorage.usuarioId = userName;
            sessionStorage.requestUserInfo = JSON.stringify({ usuarioId: userName });

            dispatch(SignIn(response));
            navigate(lastPath, { replace: true });
        });
    };


    return (
        <Box
            sx={{
                minHeight: '100vh',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                backgroundColor: 'white',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2
            }}
        >
            <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 6 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom align="center">
                        Iniciar Sesión
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            fullWidth
                            size="medium"
                            margin="normal"
                            label="Usuario"
                            name="userName"
                            value={form.userName}
                            onChange={handleChange}
                            autoFocus

                        />
                        <TextField

                            size="medium"
                            fullWidth
                            margin="normal"
                            label="Contraseña"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={form.password}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2 }}
                        >
                            Entrar
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}