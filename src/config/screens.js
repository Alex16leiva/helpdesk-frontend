import MenuBookIcon from '@mui/icons-material/MenuBook';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { TicketsInfo } from '../pages/Tickets/TicketsInfo';
import { TicketDetail } from '../pages/Tickets/TicketDetail';
import { CreateTicket } from '../pages/Tickets/CreateTicket';
import { KnowledgeBase } from '../pages/Knowledge/KnowledgeBase';
import { ArticleDetail } from '../pages/Knowledge/Articulos/ArticleDetail';
import EditArticle from '../pages/Knowledge/Articulos/editar';
import { CreateArticle } from '../pages/Knowledge/Articulos/crear';
import { UserAdminDashboard } from '../pages/Security/AdminDashboard';

export const Screens = [
    {
        path: 'TicketDetail/:ticketId',
        showInMenu: false,
        element: <TicketDetail />
    },
    {
        path: '/create-ticket',
        showInMenu: false,
        element: <CreateTicket />
    },
    {
        path: '/articles/new',
        showInMenu: false,
        element: <CreateArticle />
    },
    {
        path: '/articles/:id/edit',
        showInMenu: false,
        element: <EditArticle />
    },
    {
        path: 'articles/:id',
        showInMenu: false,
        element: <ArticleDetail />
    },
    {
        title: 'Gestión de Tickets',
        hasSecurity: true,
        securityName: 'Ticket',
        icon: <ChatBubbleOutlineIcon sx={{ fontSize: 40, color: '#333' }} />,
        info: 'Crea, rastrea y resuelve tickets de soporte de manera eficiente con nuestro sistema intuitivo.',
        path: '/tickets',
        element: <TicketsInfo />,
        showInMenu: true
    },
    {
        title: 'Base de Conocimientos',
        hasSecurity: true,
        securityName: 'Seguridad',
        icon: <MenuBookIcon sx={{ fontSize: 40, color: '#333' }} />,
        info: 'Accede a artículos y tutoriales para resolver problemas comunes de forma autónoma.',
        path: '/conocimientos',
        element: <KnowledgeBase />,
        showInMenu: true
    },
    {
        title: 'Soporte 24/7',
        hasSecurity: true,
        securityName: 'Seguridad',
        icon: <SupportAgentIcon sx={{ fontSize: 40, color: '#333' }} />,
        info: 'Nuestro equipo de agentes está disponible para ayudarte en cualquier momento.',
        path: '/soporte',
        element: null,
        showInMenu: true
    },
    {
        title: 'Soporte 24/7',
        hasSecurity: true,
        securityName: 'Seguridad',
        icon: <SupportAgentIcon sx={{ fontSize: 40, color: '#333' }} />,
        info: 'Nuestro equipo de agentes está disponible para ayudarte en cualquier momento.',
        path: '/soporte',
        element: <UserAdminDashboard />,
        showInMenu: true
    }

];