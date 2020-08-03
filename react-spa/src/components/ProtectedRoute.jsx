import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const isAuthenticated = useContext(AuthContext)

    return (
        <Route 
            {...rest} 
            render={
            props => { 
                return isAuthenticated ? 
                <Component {...rest} {...props} /> : 
                <Redirect to='/login' />
            }}
        />
    )
}

export default ProtectedRoute;
