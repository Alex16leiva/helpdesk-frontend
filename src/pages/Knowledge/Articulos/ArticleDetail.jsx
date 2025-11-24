import {
    Box, Typography, Chip, Divider, Button, Grid
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RestClient } from '../../../api/RestClient';

export const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [articulo, setArticulo] = useState(null);

    const ObtenerArticulo = async () => {
        const response = await RestClient.get(`article/get-article/${id}`);
        if (response) {
            setArticulo(response);
        }
    };

    useEffect(() => {
        ObtenerArticulo();
    }, [id]);

    const renderContenido = (contenido) => {
        return contenido?.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
                return (
                    <Typography key={index} variant="h5" sx={{ mt: 3, fontWeight: 600 }}>
                        {line.replace('# ', '')}
                    </Typography>
                );
            } else if (line.startsWith('## ')) {
                return (
                    <Typography key={index} variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
                        {line.replace('## ', '')}
                    </Typography>
                );
            } else if (line.match(/^\d+\./)) {
                return (
                    <Typography key={index} variant="body1" sx={{ ml: 2 }}>
                        {line}
                    </Typography>
                );
            } else if (line.startsWith('- ')) {
                return (
                    <Typography key={index} variant="body2" sx={{ ml: 2 }}>
                        • {line.replace('- ', '')}
                    </Typography>
                );
            } else {
                return (
                    <Typography key={index} variant="body2" sx={{ mt: 1 }}>
                        {line}
                    </Typography>
                );
            }
        });
    };

    if (!articulo) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography variant="h6">Cargando artículo...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', p: 4 }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                >
                    Volver
                </Button>
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/articles/${id}/edit`)}
                >
                    Editar
                </Button>
            </Grid>

            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                {articulo.titulo}
            </Typography>

            <Box sx={{ mb: 3 }}>
                {renderContenido(articulo.contenido)}
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {articulo.tags?.split(',').map((tag, index) => (
                    <Chip key={index} label={tag.trim()} size="small" />
                ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption">
                    Creado el {new Date(articulo.fechaCreacion).toLocaleDateString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <VisibilityIcon fontSize="small" />
                    <Typography variant="caption">{articulo.contadorDeVisitas}</Typography>
                </Box>
            </Box>
        </Box>
    );
};