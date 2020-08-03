import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from '../overmind';

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const isAuthenticated = this.props.overmind.actions.isAuthenticated()

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

export default connect(ProtectedRoute);
