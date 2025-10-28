import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Chip } from '@mui/material';

const priorityConfig = {
    3: {
        label: 'Baja',
        icon: ArrowDownwardIcon,
        bgColor: '#e0f2f1',   // verde agua claro
        textColor: '#00796b', // verde oscuro
    },
    2: {
        label: 'Media',
        icon: RemoveIcon,
        bgColor: '#fff3e0',   // naranja claro
        textColor: '#ef6c00', // naranja oscuro
    },
    1: {
        label: 'Alta',
        icon: ArrowUpwardIcon,
        bgColor: '#ffebee',   // rojo claro
        textColor: '#c62828', // rojo oscuro
    },
};


export const TicketPriorityBadge = ({ priority }) => {
    const config = priorityConfig[priority];
    const Icon = config.icon;

    return (
        <Chip
            icon={<Icon sx={{ fontSize: 16, color: config.textColor }} />}
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
