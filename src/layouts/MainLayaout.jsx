import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export const MainLayout = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleHome = () => {
        navigate('/');
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar
                position="sticky"
                sx={{
                    bgcolor: 'black',
                    height: 64,        // 👈 altura fija
                    justifyContent: 'center',
                }}
            >

                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        component="div"
                        onClick={handleHome}
                        sx={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                        Helpdesk
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body1">
                            {user?.usuarioId || 'Invitado'}
                        </Typography>
                        <IconButton color="inherit" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{}}>
                {children}
            </Box>
        </Box>
    );
};
