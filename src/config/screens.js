import MenuBookIcon from '@mui/icons-material/MenuBook';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export const Screens = [
    {
        title: 'Gestión de Tickets',
        hasSecurity: true,
        securityName: 'Ticket',
        icon: <ChatBubbleOutlineIcon sx={{ fontSize: 40, color: '#333' }} />,
        info: 'Crea, rastrea y resuelve tickets de soporte de manera eficiente con nuestro sistema intuitivo.',
        path: '/tickets'
    },
    {
        title: 'Base de Conocimientos',
        hasSecurity: true,
        securityName: 'Seguridad',
        icon: <MenuBookIcon sx={{ fontSize: 40, color: '#333' }} />,
        info: 'Accede a artículos y tutoriales para resolver problemas comunes de forma autónoma.',
        path: '/conocimientos'
    },
    {
        title: 'Soporte 24/7',
        hasSecurity: true,
        securityName: 'Seguridad',
        icon: <SupportAgentIcon sx={{ fontSize: 40, color: '#333' }} />,
        info: 'Nuestro equipo de agentes está disponible para ayudarte en cualquier momento.',
        path: '/soporte'
    },
    {
        title: 'Soporte 24/7',
        hasSecurity: true,
        securityName: 'Seguridad',
        icon: <SupportAgentIcon sx={{ fontSize: 40, color: '#333' }} />,
        info: 'Nuestro equipo de agentes está disponible para ayudarte en cualquier momento.',
        path: '/soporte'
    }
];