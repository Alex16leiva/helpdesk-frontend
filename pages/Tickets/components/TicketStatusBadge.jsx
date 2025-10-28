import { Chip, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const statusConfig = {
    Open: {
        label: 'Abierto',
        icon: HelpOutlineIcon,
        bgColor: '#e3f2fd',   // azul claro
        textColor: '#1565c0', // azul oscuro
    },
    InProcess: {
        label: 'En Progreso',
        icon: HourglassTopIcon,
        bgColor: '#fff3e0',   // naranja claro
        textColor: '#ef6c00', // naranja oscuro
    },
    Closed: {
        label: 'Resuelto',
        icon: CheckCircleIcon,
        bgColor: '#e8f5e9',   // verde claro
        textColor: '#2e7d32', // verde oscuro
    },
    Canceled: {
        label: 'Cancelado',
        icon: CancelIcon,
        bgColor: '#ffebee',   // rojo claro
        textColor: '#c62828', // rojo oscuro
    },
};


export const TicketStatusBadge = ({ status }) => {
    const config = statusConfig[status];
    if (!config) return null;

    const Icon = config.icon;

    return (
        <Chip
            icon={
                <Box sx={{ color: config.textColor }}>
                    <Icon sx={{ fontSize: 16 }} />
                </Box>
            }
            label={config.label}
            variant="outlined"
            size="small"
            sx={{
                backgroundColor: config.bgColor,
                color: config.textColor,
                borderColor: config.textColor,
                fontWeight: 500,
                px: 1,
                py: 0.5,
                borderRadius: 1,
                textTransform: 'capitalize',
            }}
        />
    );
}