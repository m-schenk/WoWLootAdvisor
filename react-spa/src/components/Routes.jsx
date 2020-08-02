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
    render() {
        return(
            <Router>
                <div className="justify-content-center align-items-center" id="wrapper">
                    <div className="justify-content-center align-items-center" id="header"><Navbar /></div>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <ProtectedRoute exact path="/" isAuthenticated={this.props.overmind.actions.isisAuthenticated} component={MainContent} />
                        <ProtectedRoute path="/wishlist" component={MainContent} />
                        <ProtectedRoute path="/profile" component={Profile} />
                        <ProtectedRoute path="/council/members" component={Members} />
                        <ProtectedRoute path="/council/raidhistory" component={RaidHistory} />
                        <ProtectedRoute path="/council/livesession" component={LiveSession} />
                    </Switch>
                    <div className="justify-content-center align-items-center" id="footer"><Footer /></div>
                </div>
            </Router>
        )
    }
}

export default connect(Routes);
