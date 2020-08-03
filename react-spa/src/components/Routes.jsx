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
                                <Auth.Provider value={this.props.overmind.state.isAuth}>
                                    <ProtectedRoute exact path="/" component={MainContent} />
                                    <ProtectedRoute path="/wishlist" component={MainContent} />
                                    <ProtectedRoute path="/profile" component={Profile} />
                                    <ProtectedRoute path="/council/members" component={Members} />
                                    <ProtectedRoute path="/council/raidhistory" component={RaidHistory} />
                                    <ProtectedRoute path="/council/livesession" component={LiveSession} />
                                </Auth.Provider>
                            <div className="justify-content-center align-items-center" id="footer"><Footer /></div>
                        </div>
                    </Switch>
            </Router>
        )
    }
}

export default connect(Routes);
