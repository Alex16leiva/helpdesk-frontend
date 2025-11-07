import { Routes, Route } from 'react-router-dom';
import Menu from '../pages/Menu';
import { Screens } from '../config/screens';

export const InternalRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Menu />} />
            {
                Screens.filter(screen => screen.element != null).map((screen, index) => (
                    <Route
                        key={index}
                        path={screen.path}
                        element={screen.element}
                    />
                ))
            }
        </Routes>
    );
};