import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { Screens } from '../config/screens';
import MetroBlock from '../components/MetroMenu/MetroBlock';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const { permisos } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const screensPermitidas = Screens.filter(item =>
        permisos?.some(permiso =>
            permiso.pantallaId === item.securityName && permiso.ver
        )
    );

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h2" gutterBottom
                sx={{
                    textAlign: 'center',
                    mb: 4
                }}
            >
                Soporte al Cliente Simplificado
            </Typography>

            <Typography gutterBottom
                sx={{
                    textAlign: 'center',
                    color: 'text.secondary',
                    fontSize: '1.8rem'
                }}
            >
                Bienvenido al centro de soporte. Selecciona una opción para comenzar.
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)', // máximo 3 columnas
                    gap: 4, // separación entre bloques
                    mt: 12
                }}

            >

                {screensPermitidas.map((screen, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <MetroBlock
                            title={screen.title}
                            description={screen.info}
                            icon={screen.icon}
                            color={screen.color}
                            onClick={() => navigate(screen.path)}
                        />
                    </Grid>
                ))}
            </Box>
        </Box>
    );
};

export default Menu;