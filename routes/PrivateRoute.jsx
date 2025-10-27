import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
    const { logged } = useSelector(state => state.auth);
    const { pathname, search } = useLocation();

    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath);

    return logged ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};