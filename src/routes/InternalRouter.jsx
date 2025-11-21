import { Routes, Route } from 'react-router-dom';
import Menu from '../pages/Menu';
import { TicketsInfo } from '../pages/Tickets/TicketsInfo';

export const InternalRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/tickets" element={<TicketsInfo />} />
        </Routes>
    );
};