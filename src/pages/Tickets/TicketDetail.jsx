/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    Stack,
    Modal,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RestClient } from '../../api/RestClient';
import { TicketPriorityBadge } from './components/TicketPriorityBadge';
import { TicketStatusBadge } from './components/TicketStatusBadge';
import { TimeHelper } from '../../utils/TimeHelper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CoreUtils } from '../../utils/CoreUtils';

const prioridadMap = {
    Alta: 1,
    Media: 2,
    Baja: 3
};

const prioridadReverseMap = {
    1: 'Alta',
    2: 'Media',
    3: 'Baja'
};

export const TicketDetail = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [comentarioTexto, setComentarioTexto] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editFields, setEditFields] = useState({
        estado: '',
        prioridad: '',
        asignadoA: ''
    });
    const navigate = useNavigate();

    const handleClickRegresarATickets = () => {
        navigate('/tickets');
    };

    const crearComentario = () => {
        if (CoreUtils.isNullOrEmpty(comentarioTexto)) {
            CoreUtils.notificationWarning('Debe escribir un comentario antes de enviarlo');
            return;
        }
        const request = {
            TicketComment: {
                ticketId: ticket.ticketId,
                comentario: comentarioTexto
            }
        };
        RestClient.post('ticket/crear-ticket-comment', request).then((response) => {
            if (!CoreUtils.hasErrorResponse(response)) {
                CoreUtils.notificationSuccess('Se registró su respuesta');
                setComentarioTexto('');
                fetchTicket();
            }
        });
    };

    const handleClickCerrarTicket = () => {
        const request = {
            ticket: {
                ticketId: ticket.ticketId
            }
        };
        RestClient.put('ticket/cerrar-ticket', request).then((response) => {
            if (!CoreUtils.hasErrorResponse(response)) {
                CoreUtils.notificationSuccess('Ticket cerrado');
                fetchTicket();
            }
        });
    };

    const abrirModalEdicion = () => {
        setEditFields({
            estado: ticket.estado,
            prioridad: prioridadReverseMap[ticket.prioridad],
            asignadoA: CoreUtils.stringValueOrEmpty(ticket.asignadoAUsuario)
        });
        setModalOpen(true);
    };

    const guardarEdicionTicket = () => {
        const request = {
            ticket: {
                ticketId: ticket.ticketId,
                estado: editFields.estado,
                prioridad: prioridadMap[editFields.prioridad],
                AsignadoAUsuario: CoreUtils.stringValueOrEmpty(editFields.asignadoA)
            }
        };

        RestClient.put('ticket/update', request).then((response) => {
            if (!CoreUtils.hasErrorResponse(response)) {
                CoreUtils.notificationSuccess('Ticket actualizado correctamente');
                setModalOpen(false);
                fetchTicket();
            }
        });
    };

    const fetchTicket = async () => {
        const response = await RestClient.get(`ticket/${ticketId}`);
        setTicket(response);
    };

    useEffect(() => {
        fetchTicket();
    }, [ticketId]);

    if (!ticket) return <Typography>Cargando ticket...</Typography>;

    return (
        <Box sx={{ backgroundColor: '#f9f9f9', p: 4, pr: 14, pl: 14 }}>
            <Button size="sm" variant="outlined" onClick={handleClickRegresarATickets}>
                <ArrowBackIcon />
                Volver a Tickets
            </Button>

            <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 8 }}>
                <Box>
                    <Paper sx={{ p: 4, mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }} color="text.secondary">
                                {ticket.ticketId}
                            </Typography>
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

                    <Paper sx={{ p: 4, mt: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Comentarios
                        </Typography>
                        {CoreUtils.isValidEntity(ticket.comentarios) && ticket.comentarios.length > 0 ? (
                            <Stack spacing={2}>
                                {ticket.comentarios.map((comentario) => (
                                    <Paper key={comentario.id} sx={{ p: 2 }}>
                                        <Typography variant="body2" sx={{ color: 'gray' }}>
                                            {comentario.modificadoPor} • {TimeHelper.formatearFecha(comentario.fechaTransaccion)}
                                        </Typography>
                                        <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
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
                        <Button variant="outlined" fullWidth sx={{ mb: 2 }} onClick={abrirModalEdicion}>
                            Editar Ticket
                        </Button>
                        <Button
                            onClick={handleClickCerrarTicket}
                            variant="outlined"
                            color="error"
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            Cerrar Ticket
                        </Button>
                    </Paper>

                    <Paper sx={{ p: 4, mt: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Solicitante
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray' }}>
                            {ticket.creadoPor}
                        </Typography>
                    </Paper>

                    <Paper sx={{ p: 4, mt: 4 }}>
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
                        <TicketPriorityBadge priority={ticket.prioridad} sx={{ mb: 1 }} />
                        <Typography variant="body2" sx={{ color: 'gray', mb: 1, mt: 2 }}>
                            Creado
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            {TimeHelper.formatearFecha(ticket.fechaCreado)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray', mb: 1, mt: 2 }}>
                            Asignado A
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            {ticket.asignadoAUsuario || 'No asignado'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>
                            Última actualización
                        </Typography>
                        <Typography variant="body2">
                            {TimeHelper.formatearFecha(ticket.fechaTransaccion)}
                        </Typography>
                    </Paper>
                </Box>
            </Box>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Editar Ticket
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Estado</InputLabel>
                        <Select
                            name="estado"
                            value={editFields.estado}
                            onChange={(e) => setEditFields({ ...editFields, estado: e.target.value })}
                            label="Estado"
                        >
                            <MenuItem value="Open">Abierto</MenuItem>
                            <MenuItem value="Closed">Cerrado</MenuItem>
                            <MenuItem value="InProgress">En Proceso</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Prioridad</InputLabel>
                        <Select
                            name="prioridad"
                            value={editFields.prioridad}
                            onChange={(e) => setEditFields({ ...editFields, prioridad: e.target.value })}
                            label="Prioridad"
                        >
                            <MenuItem value="Baja">Baja</MenuItem>
                            <MenuItem value="Media">Media</MenuItem>
                            <MenuItem value="Alta">Alta</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Asignado A"
                        name="asignadoA"
                        value={editFields.asignadoA}
                        onChange={(e) => setEditFields({ ...editFields, asignadoA: e.target.value })}
                        sx={{ mb: 2 }}
                    />

                    <Button variant="contained" fullWidth onClick={guardarEdicionTicket}>
                        Guardar Cambios
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};