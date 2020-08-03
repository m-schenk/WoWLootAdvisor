import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    console.log(isAuthenticated)
    return (
        <Route 
            {...rest} 
            render={
            props => { 
                return isAuthenticated === true 
                ? <Component {...rest} {...props} />
                : <Redirect to='/login' />
            }}
        />
    )
}

export default ProtectedRoute;
