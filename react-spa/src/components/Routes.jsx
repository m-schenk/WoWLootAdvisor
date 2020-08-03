import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from './../overmind';

import { AuthContext } from './AuthContext';

import MainContent from './pages/wishlist/MainContent';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Members from './pages/council/Members';
import RaidHistory from './pages/council/RaidHistory';
import LiveSession from './pages/council/LiveSession';

import Navbar from './Navbar';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';

import '@atlaskit/css-reset';
import './assets/App.css';


class Routes extends React.Component {

    componentWillUpdate() {
        this.props.overmind.actions.isAuthenticated()
    }

    componentDidMount() {
        this.props.overmind.actions.isAuthenticated()
    }

    componentDidUpdate() {
        this.props.overmind.actions.isAuthenticated()
    }

    render() {
        return(
            <Router>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <div className="justify-content-center align-items-center" id="wrapper">
                            <div className="justify-content-center align-items-center" id="header"><Navbar /></div>
                                <ProtectedRoute exact path="/" isAuthenticated={this.props.overmind.state.isAuth} component={MainContent} />
                                <ProtectedRoute path="/wishlist" isAuthenticated={this.props.overmind.state.isAuth} component={MainContent} />
                                <ProtectedRoute path="/profile" isAuthenticated={this.props.overmind.state.isAuth} component={Profile} />
                                <ProtectedRoute path="/council/members" isAuthenticated={this.props.overmind.state.isAuth} component={Members} />
                                <ProtectedRoute path="/council/raidhistory" isAuthenticated={this.props.overmind.state.isAuth} component={RaidHistory} />
                                <ProtectedRoute path="/council/livesession" isAuthenticated={this.props.overmind.state.isAuth} component={LiveSession} />
                            <div className="justify-content-center align-items-center" id="footer"><Footer /></div>
                        </div>
                    </Switch>
            </Router>
        )
    }
}

export default connect(Routes);
