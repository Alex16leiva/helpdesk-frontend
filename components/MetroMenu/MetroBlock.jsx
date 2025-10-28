import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const MetroBlock = ({ title, description, icon, onClick }) => {
    return (
        <Paper
            elevation={2}
            sx={{
                width: '90%',
                height: 200, // tamaño fijo
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    backgroundColor: '#f5f5f5'
                },
                borderRadius: 2,
                backgroundColor: '#fff',
                px: 2
            }}
            onClick={onClick}
        >
            <Box sx={{ mb: 1 }}>{icon}</Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {title}
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    mt: 1,
                    color: '#555',
                    textAlign: 'center',
                    wordWrap: 'break-word',
                    whiteSpace: 'normal',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3, // máximo 3 líneas visibles
                    WebkitBoxOrient: 'vertical'
                }}
            >
                {description}
            </Typography>
        </Paper>
    );
};

export default MetroBlock;