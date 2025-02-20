import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, loading, children }) => {
    if (loading) {
        return <p>Loading...</p>; // Show loading indicator while authentication is being checked
    }

    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;