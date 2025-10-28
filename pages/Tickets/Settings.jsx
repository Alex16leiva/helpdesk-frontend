import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

export const infoTickets = [
    {
        title: "Tickets Abiertos",
        state: "Open",
        value: "0",
        icon: ChatBubbleOutlineOutlinedIcon,
        description: "Tickets activos",
    },
    {
        title: "En Progreso",
        value: "0",
        state: "InProcess",
        icon: AccessTimeOutlinedIcon,
        description: "Siendo atendidos",
    },
    {
        title: "Resueltos",
        value: "0",
        state: "Closed",
        icon: CheckCircleOutlineOutlinedIcon,
        description: "Este mes",
    },
    {
        title: "Ticket Mas Antiguo",
        value: "0",
        state: "OlderTicket",
        icon: AccessTimeOutlinedIcon,
        description: "Pendiente por más tiempo",
    }
]