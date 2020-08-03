import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from './../overmind';

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

    auth() {
        this.props.overmind.actions.isAuthenticated()
    }

    render() {
        return(
            <Router>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <div className="justify-content-center align-items-center" id="wrapper">
                            <div className="justify-content-center align-items-center" id="header"><Navbar /></div>
                                <ProtectedRoute exact path="/" isAuthenticated={() => {this.auth()}} component={MainContent} />
                                <ProtectedRoute path="/wishlist" isAuthenticated={() => {this.auth()}} component={MainContent} />
                                <ProtectedRoute path="/profile" isAuthenticated={() => {this.auth()}} component={Profile} />
                                <ProtectedRoute path="/council/members" isAuthenticated={() => {this.auth()}} component={Members} />
                                <ProtectedRoute path="/council/raidhistory" isAuthenticated={() => {this.auth()}} component={RaidHistory} />
                                <ProtectedRoute path="/council/livesession" isAuthenticated={() => {this.auth()}} component={LiveSession} />
                            <div className="justify-content-center align-items-center" id="footer"><Footer /></div>
                        </div>
                    </Switch>
            </Router>
        )
    }
}

export default connect(Routes);
