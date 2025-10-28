import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { MainLayout } from '../layouts/MainLayaout';
import { InternalRouter } from './InternalRouter';


export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

            <Route
                path="/*"
                element={
                    <PrivateRoute>
                        <MainLayout>
                            <InternalRouter />
                        </MainLayout>
                    </PrivateRoute>
                }
            />
        </Routes>
    );

}