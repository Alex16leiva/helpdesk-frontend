/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    Stack
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RestClient } from '../../api/RestClient';
import { TicketPriorityBadge } from './components/TicketPriorityBadge';
import { TicketStatusBadge } from './components/TicketStatusBadge';
import { TimeHelper } from '../../utils/TimeHelper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CoreUtils } from '../../utils/CoreUtils';

export const TicketDetail = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [comentarioTexto, setComentarioTexto] = useState("");
    const navigate = useNavigate();

    const handleClickRegresarATickets = () => {
        navigate('/tickets');
    }

    const crearComentario = () => {
        if (CoreUtils.isNullOrEmpty(comentarioTexto)) {
            CoreUtils.notificationWarning("Debe escribir un comentario antes de enviarlo");
            return;
        }
        var request = {
            TicketComment: {
                ticketId: ticket.ticketId,
                comentario: comentarioTexto
            }
        }
        RestClient.post('ticket/crear-ticket-comment', request)
            .then(response => {
                if (!CoreUtils.hasErrorResponse(response)) {
                    CoreUtils.notificationSuccess("Se registro su respuesta");

                    setComentarioTexto("");

                    fetchTicket();
                }
            })
    }

    const handleClickCerrarTicket = () => {
        var request = {
            ticket: {
                ticketId: ticket.ticketId
            }
        }
        RestClient.put('ticket/cerrar-ticket', request)
            .then(response => {
                if (!CoreUtils.hasErrorResponse(response)) {
                    CoreUtils.notificationSuccess("Ticket cerrado");
                    fetchTicket();
                }
            })
    }

    const fetchTicket = async () => {
        const response = await RestClient.get(`ticket/${ticketId}`);
        setTicket(response);
    };

    useEffect(() => {
        fetchTicket();
    }, [ticketId]);

    if (!ticket) return <Typography>Cargando ticket...</Typography>;

    return (
        <Box sx={{
            backgroundColor: '#f9f9f9',
            p: 4,
            pr: 14,
            pl: 14
        }}>
            <Button size='sm' variant="outlined" onClick={handleClickRegresarATickets}>
                <ArrowBackIcon />
                Volver a Tickets
            </Button>
            <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 8 }}>

                <Box>

                    <Paper sx={{ p: 4, mt: 2 }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                            gap: 2
                        }}>
                            {ticket.ticketId}
                            <TicketStatusBadge status={ticket.estado} sx={{ ml: 2 }} />
                            <TicketPriorityBadge priority={ticket.prioridad} sx={{ ml: 2 }} />
                        </Box>

                        <Typography variant="h5" sx={{ fontWeight: 100, mb: 2 }}>
                            {ticket.titulo}
                        </Typography>

                        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                            {ticket.descripcion}
                        </Typography>
                    </Paper>

                    <Paper sx={{ p: 4, mt: 4, maxWidth: '100%', overflow: 'hidden' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Comentarios
                        </Typography>
                        {
                            CoreUtils.isValidEntity(ticket.comentarios) && ticket.comentarios.length > 0 ? (
                                <Stack spacing={2}>
                                    {ticket.comentarios.map((comentario) => (
                                        <Paper key={comentario.id} sx={{ p: 2, overflow: 'hidden', maxWidth: '100%' }}>
                                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                                {comentario.modificadoPor} • {TimeHelper.formatearFecha(comentario.fechaTransaccion)}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    overflowWrap: 'break-word',  // Permitir que las palabras largas se dividan
                                                    wordWrap: 'break-word',       // Compatibilidad con navegadores más antiguos
                                                    wordBreak: 'break-all',       // Permitir que las palabras largas se rompan
                                                    overflow: 'hidden',            // Ocultar el desbordamiento
                                                    display: 'block',              // Asegurar que el bloque ocupe toda la línea
                                                    maxWidth: '100%',              // Asegurarse de que no supere el ancho del contenedor
                                                }}
                                            >
                                                {comentario.comentario}
                                            </Typography>
                                        </Paper>
                                    ))}
                                </Stack>
                            ) : (
                                <Typography variant="body2" sx={{ color: 'gray' }}>
                                    No hay comentarios
                                </Typography>
                            )}
                    </Paper>

                    <Paper sx={{ p: 4, mt: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Agregar Respuesta
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            value={comentarioTexto}
                            onChange={(e) => setComentarioTexto(e.target.value)}
                            placeholder="Escribe tu respuesta aquí..."
                        />
                        <Button variant="contained" sx={{ mt: 2 }} onClick={crearComentario}>
                            Enviar Respuesta
                        </Button>
                    </Paper>

                </Box>

                <Box>

                    <Paper sx={{ p: 4, mt: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Acciones
                        </Typography>
                        <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
                            Editar Ticket
                        </Button>
                        <Button
                            onClick={handleClickCerrarTicket}
                            variant="outlined"
                            color="error"
                            fullWidth sx={{ mb: 2 }}
                        >
                            Cerrar Ticket
                        </Button>

                    </Paper>

                    <Paper sx={{ p: 4, mt: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Solicitante
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray' }}>
                            {`${ticket.creadoPor}`}
                        </Typography>
                    </Paper>

                    <Paper sx={{
                        p: 4,
                        mt: 4,
                    }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Información del Ticket
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>
                            Estado
                        </Typography>
                        <TicketStatusBadge status={ticket.estado} sx={{ mb: 2, mt: 1 }} />
                        <Typography variant="body2" sx={{ color: 'gray', mb: 2, mt: 2 }}>
                            Prioridad
                        </Typography>
                        <TicketPriorityBadge priority={ticket.prioridad} sx={{ mb: 1, }} />
                        <Typography variant="body2" sx={{ color: 'gray', mb: 1, mt: 2 }}>
                            {`Creado`}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, mt: 2 }}>
                            {TimeHelper.formatearFecha(ticket.fechaCreado)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>
                            {`Última actualización`}
                        </Typography>
                        <Typography variant="body2">
                            {TimeHelper.formatearFecha(ticket.fechaTransaccion)}
                        </Typography>
                    </Paper>

                </Box>
            </Box>
        </Box>
    );
};