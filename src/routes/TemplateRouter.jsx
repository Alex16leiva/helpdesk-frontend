import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

export const TemplateRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />

        </Routes>
    );
};