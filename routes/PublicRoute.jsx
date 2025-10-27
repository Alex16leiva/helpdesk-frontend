import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
    const { logged } = useSelector(state => state.auth);

    return logged ? <Navigate to="/" /> : children;
};

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
};