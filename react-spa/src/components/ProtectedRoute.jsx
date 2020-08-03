import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from '../overmind';

class ProtectedRoute extends React.Component {
    render() {
        const isAuthenticated = this.props.overmind.actions.isAuthenticated()
        return (
            <Route
                {...rest}
                render={
                    props => {
                        return isAuthenticated ?
                            <this.props.Component {...rest} {...props} /> :
                            <Redirect to='/login' />
                    }}
            />
        )
    }
}

export default connect(ProtectedRoute);
