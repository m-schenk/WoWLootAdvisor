import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from './../overmind';

import MainContent from './pages/wishlist/MainContent';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Members from './pages/council/Members';
import Navbar from './Navbar';
import Footer from './Footer';

import '@atlaskit/css-reset';
import './assets/App.css';

class Routes extends React.Component {
    render() {
        return(
            <Router>
                <div className="justify-content-center align-items-center" id="wrapper">
                    <div className="justify-content-center align-items-center" id="header"><Navbar /></div>
                    <Switch>
                        <Route exact path="/" component={MainContent} />
                        <Route path="/wishlist" component={MainContent} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/login" component={Login} />
                        <Route path="/council/members" component={Members} />
                    </Switch>
                    <div className="justify-content-center align-items-center" id="footer"><Footer /></div>
                </div>
            </Router>
        )
    }
}

export default connect(Routes);
