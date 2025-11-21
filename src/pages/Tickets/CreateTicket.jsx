import {
    Box,
    Button,
    TextField,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RestClient } from '../../api/RestClient';
import { CoreUtils } from '../../utils/CoreUtils';

export const CreateTicket = () => {
    const navigate = useNavigate();
    const [ticket, setTicket] = useState({
        ticketId: '',
        titulo: '',
        descripcion: '',
        prioridad: 'Baja',
        estado: 'Open',
        creadoPor: '',
        asignadoA: ''
    });
    const [readonly, setReadonly] = useState(false);

    const prioridadMap = {
        Baja: 3,
        Media: 2,
        Alta: 1
    };

    const handleChange = (e) => {
        setTicket({ ...ticket, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const request = {
            ticket: {
                titulo: ticket.titulo,
                descripcion: ticket.descripcion,
                prioridad: prioridadMap[ticket.prioridad],
                estado: ticket.estado,
                creadoPor: ticket.creadoPor || null,
                asignadoA: ticket.asignadoA || null
            }
        };

        RestClient.post('ticket/create-ticket', request)
            .then((response) => {
                if (!CoreUtils.hasErrorResponse(response)) {
                    const creado = response;
                    setTicket({
                        ...ticket,
                        ticketId: creado.ticketId,
                        titulo: creado.titulo,
                        descripcion: creado.descripcion,
                        prioridad: Object.keys(prioridadMap).find(
                            (key) => prioridadMap[key] === creado.prioridad
                        ),
                        estado: creado.estado
                    });
                    setReadonly(true);
                    CoreUtils.notificationSuccess('Ticket creado exitosamente');
                }
            });
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/tickets')}
                >
                    Volver a Tickets
                </Button>
                {!readonly && (
                    <Button variant="contained" onClick={handleSubmit}>
                        Crear Ticket
                    </Button>
                )}
            </Stack>

            <Typography variant="h5" gutterBottom>
                Crear nuevo ticket
            </Typography>

            <TextField
                fullWidth
                label="Ticket ID"
                name="ticketId"
                value={ticket.ticketId}
                InputProps={{ readOnly: true }}
                margin="normal"
            />

            <TextField
                fullWidth
                label="Título"
                name="titulo"
                value={ticket.titulo}
                onChange={handleChange}
                margin="normal"
                disabled={readonly}
            />

            <TextField
                fullWidth
                label="Descripción"
                name="descripcion"
                value={ticket.descripcion}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
                disabled={readonly}
            />

            <FormControl fullWidth margin="normal" disabled={readonly}>
                <InputLabel>Prioridad</InputLabel>
                <Select
                    name="prioridad"
                    value={ticket.prioridad}
                    onChange={handleChange}
                    label="Prioridad"
                >
                    <MenuItem value="Baja">Baja</MenuItem>
                    <MenuItem value="Media">Media</MenuItem>
                    <MenuItem value="Alta">Alta</MenuItem>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Estado"
                name="estado"
                value={ticket.estado}
                InputProps={{ readOnly: true }}
                margin="normal"
            />

            <TextField
                fullWidth
                label="Creado Por"
                name="creadoPor"
                value={ticket.creadoPor}
                onChange={handleChange}
                margin="normal"
                disabled={readonly}
            />

            <TextField
                fullWidth
                label="Asignado A"
                name="asignadoA"
                value={ticket.asignadoA}
                onChange={handleChange}
                margin="normal"
                disabled={readonly}
            />
        </Box>
    );
};