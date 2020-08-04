import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from './../overmind';

import MainContent from './pages/wishlist/MainContent';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Members from './pages/council/Members';
import RaidHistory from './pages/council/RaidHistory';
import LiveSession from './pages/council/LiveSession';
import axios from 'axios';

import Navbar from './Navbar';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';

import '@atlaskit/css-reset';
import './assets/App.css';


class Routes extends React.Component {
    constructor() {
        this.auth = false
    }

    componentDidUpdate() {
        await axios.get('http://raegae.maarten.ch:3000/api/discord/isauth', { withCredentials: true })
        .then(response => {
            console.log(response)
            if(response.status === 200) {
                console.log("auth true")
                this.isAuth = true;
            } else {
                this.isAuth = false 
            }
        }).catch(err => {
            console.log(err)
        })
    }
    
    render() {
        console.log(isAuth)
        return(
            <Router>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <div className="justify-content-center align-items-center" id="wrapper">
                            <div className="justify-content-center align-items-center" id="header"><Navbar /></div>
                                <ProtectedRoute exact path="/" isAuthenticated={this.isAuth} component={MainContent} />
                                <ProtectedRoute path="/wishlist" isAuthenticated={this.isAuth} component={MainContent} />
                                <ProtectedRoute path="/profile" isAuthenticated={this.isAuth} component={Profile} />
                                <ProtectedRoute path="/council/members" isAuthenticated={this.isAuth} component={Members} />
                                <ProtectedRoute path="/council/raidhistory" isAuthenticated={this.isAuth} component={RaidHistory} />
                                <ProtectedRoute path="/council/livesession" isAuthenticated={this.isAuth} component={LiveSession} />
                            <div className="justify-content-center align-items-center" id="footer"><Footer /></div>
                        </div> 
                    </Switch>
            </Router>
        )
    }
}

export default connect(Routes);
