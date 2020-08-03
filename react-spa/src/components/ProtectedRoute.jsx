import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from '../overmind';

class ProtectedRoute extends React.Component {
    render() {
        const isAuthenticated = this.props.overmind.actions.isAuthenticated()
        const Component = this.props.component;
        return (
            <Route
                render={
                    props => {
                        return isAuthenticated ?
                            <Component {...props} /> :
                            <Redirect to='/login' />
                    }}
            />
        )
    }
}

export default connect(ProtectedRoute);
