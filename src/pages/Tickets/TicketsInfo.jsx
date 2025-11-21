import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Divider,
    Button,
    TextField,
    Tabs,
    Tab,
    Container
} from '@mui/material';
import { RestClient } from '../../api/RestClient';
import { infoTickets } from './Settings';
import { TicketHeader } from './TicketHeader';
import { TicketPriorityBadge } from './components/TicketPriorityBadge';
import { TicketStatusBadge } from './components/TicketStatusBadge';
import { TimeHelper } from '../../utils/TimeHelper';
import { useNavigate } from 'react-router-dom';

const tabStateMap = {
    Todos: ['Open', 'InProcess'],
    Activos: ['InProcess'],
    Resueltos: ['Closed', 'Resolved']
};

export const TicketsInfo = () => {
    const [ticketCounts, setTicketCounts] = useState([]);
    const [rows, setRows] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [activeTab, setActiveTab] = useState('Todos');
    const navigate = useNavigate();

    const handleClickIrATicket = (ticketId) => {
        navigate(`/TicketDetail/${ticketId}`);
    }

    useEffect(() => {
        fetchTicketsInfo();
    }, []);

    useEffect(() => {
        getTickets(0, 10);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const fetchTicketsInfo = () => {
        RestClient.get('ticket/tickets-info', {}).then((response) => {
            setTicketCounts(response);
        });
    };

    const getTickets = async (pageIndex, pageSize) => {
        const estados = tabStateMap[activeTab];

        const request = {
            queryInfo: {
                pageIndex,
                pageSize,
                sortFields: ['prioridad', 'fechaCreado'],
                ascending: true,
                predicate: searchText ? 'TicketId.Contains(@0)' : '@0.Contains(Estado)',
                paramValues: searchText ? [searchText] : [estados]
            }
        };

        const response = await RestClient.post('ticket/get-paged', request);
        if (response) {
            setRows(response.items);
            setPageCount(response.pageCount);
            setPageIndex(pageIndex);
        }
    };

    const CreateTicket = () => {
        navigate('/create-ticket');
    };

    const handleSearch = () => {
        getTickets(0, 10);
    };

    const ticketValuesMap = new Map();
    ticketCounts.forEach(item => {
        ticketValuesMap.set(item.estado, item.valor);
    });

    const updatedInfoTickets = infoTickets.map(ticketInfo => {
        const valueFromCounts = ticketValuesMap.get(ticketInfo.state);
        if (valueFromCounts !== undefined) {
            return { ...ticketInfo, value: valueFromCounts };
        }
        return ticketInfo;
    });

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                Gestión de Tickets
            </Typography>

            {/* Resumen por estado */}
            <Grid container sx={{ mb: 4, width: '100%', pl: 6 }}>
                <TicketHeader items={updatedInfoTickets} />
            </Grid>

            {/* Pestañas de estado */}

            <Tabs
                centered
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}

                sx={{
                    mb: 3,
                    borderBottom: 1,
                    borderRadius: 3,
                    borderColor: 'divider',
                    backgroundColor: '#f5f5f5',
                    '& .MuiTab-root': {
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: 16,
                        color: '#555',
                    },
                    '& .Mui-selected': {
                        color: '#1976d2',
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#1976d2',
                    },
                }}
            >
                <Tab label={`Todos`} value="Todos" />
                <Tab label={`Activos`} value="Activos" />
                <Tab label={`Resueltos`} value="Resueltos" />
            </Tabs>

            {/* Buscador */}
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <TextField
                            label="Buscar por Ticket"
                            variant="outlined"
                            size="small"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Button variant="contained" onClick={handleSearch}>
                            Buscar
                        </Button>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Button variant='contained' onClick={CreateTicket}>
                            Crear Tickets
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Divider sx={{ mb: 3 }} />

            {/* Listado de tickets */}
            <Grid container spacing={3}>
                {rows.map((ticket) => (
                    <Grid item key={ticket.ticketId}
                        sx={{
                            width: '100%',
                            pr: 24,
                            pl: 18,
                        }}
                    >
                        <Paper
                            onClick={() => handleClickIrATicket(ticket.ticketId)}
                            elevation={3}
                            sx={{
                                width: '100%',
                                p: 3,
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    backgroundColor: '#f5f5f5'
                                },
                            }}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }} color="text.secondary">
                                    {ticket.ticketId}
                                </Typography>
                                <TicketStatusBadge status={ticket.estado} />
                                <TicketPriorityBadge priority={ticket.prioridad} />
                            </Box>

                            <Typography variant="h5" sx={{ mt: 1 }}>
                                {ticket.titulo}
                            </Typography>
                            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                                Asignado a: {ticket.asignadoAUsuario}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Cuenta • {TimeHelper.tiempoTranscurrido(ticket.fechaCreado)}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Paginación */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                {Array.from({ length: pageCount }).map((_, i) => (
                    <Button
                        key={i}
                        variant={i === pageIndex ? 'contained' : 'outlined'}
                        onClick={() => getTickets(i, 10)}
                    >
                        {i + 1}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};
