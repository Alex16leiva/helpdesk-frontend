import { Box, Card, CardContent, Chip, Divider, Grid, InputAdornment, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { RestClient } from '../../api/RestClient';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CoreUtils } from '../../utils/CoreUtils';

export const KnowledgeBase = () => {
    const [articulos, setArticulos] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);

    const navigate = useNavigate();

    const ObtenerArticulos = async (pageIndex, pageSize) => {
        const request = {
            queryInfo: {
                pageIndex,
                pageSize,
                sortFields: ['FechaTransaccion'],
                ascending: true,
                predicate: searchText ? 'Titulo.Contains(@0)' : '',
                paramValues: searchText ? [searchText] : []
            }
        };

        const response = await RestClient.post('article/get-articles', request);
        if (response) {
            setArticulos(response.items);
            setPageCount(response.pageCount);
            setPageIndex(pageIndex);
        }
    }

    useEffect(() => {
        ObtenerArticulos();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                gap: 2
            }}>
            <Grid sx={{
                textAlign: 'center',
                backgroundColor: 'whitesmoke',
                pt: 4,
                gap: 2,
            }}>
                <Typography variant="h4" sx={{ color: '#060303ff' }}>
                    ¿Cómo podemos ayudarte?
                </Typography>
                <Typography variant="body1" sx={{ color: '#333', mt: 2 }}>
                    Busca en nuestra base de conocimientos para encontrar respuestas a tus preguntas.
                </Typography>

                <TextField
                    variant="outlined"
                    placeholder="Buscar artículos, guías y tutoriales..."
                    sx={{ mt: 4, mb: 4, width: '600px', backgroundColor: 'white' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />

                <Divider orientation="horizontal" />
            </Grid>

            <Grid container spacing={3}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 3,
                    p: 4,
                    overflowY: 'auto',
                    flexGrow: 1
                }}
            >
                {articulos.map((articulo) => (
                    <Grid item xs={12} md={6} lg={4} key={articulo.id} >
                        <Paper elevation={4}>

                            <Card
                                sx={{ cursor: 'pointer', transition: '0.3s', '&:hover': { boxShadow: 6 } }}
                                onClick={() => navigate(`/articles/${articulo.id}`)}
                            >
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {articulo.titulo}
                                    </Typography>

                                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                                        {articulo.contenido?.substring(0, 100)}...
                                    </Typography>

                                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {articulo.tags?.split(',').map((tag, index) => (
                                            <Chip key={index} label={tag.trim()} size="small" />
                                        ))}
                                    </Box>

                                    <Divider sx={{ my: 2 }} />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="caption">
                                            {new Date(articulo.fechaCreacion).toLocaleDateString()}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <VisibilityIcon fontSize="small" />
                                            <Typography variant="caption">{articulo.contadorDeVisitas}</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

