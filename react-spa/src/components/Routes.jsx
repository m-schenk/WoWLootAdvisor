import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from './../overmind';

import MainContent from './pages/wishlist/MainContent';
import Profile from './pages/profile/Profile';
import Members from './pages/council/Members';
import RaidHistory from './pages/council/RaidHistory';
import LiveSession from './pages/council/LiveSession';

import Navbar from './Navbar';
import Footer from './Footer';

import Container from 'react-bootstrap/Container';

import '@atlaskit/css-reset';
import './assets/App.css';


class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Container className="justify-content-center" id="wrapper">
                        <div className="justify-content-center align-items-center" id="header"><Navbar /></div>
                        <Route exact path="/" component={MainContent} />
                        <Route path="/wishlist" component={MainContent} />
                        <Route path="/profile" component={Profile} />
                        {(this.props.overmind.state.player.permissions === 'council')
                            ? <><Route path="/council/members" component={Members} />
                                <Route path="/council/raidhistory" component={RaidHistory} />
                                <Route path="/council/livesession" component={LiveSession} />
                            </>
                            : <></>}
                        <div className="justify-content-center align-items-center" id="footer"><Footer /></div>
                    </Container>
                </Switch>
            </Router>
        )
    }
}

export default connect(Routes);
