import React from 'react';
import '@atlaskit/css-reset';
import Navbar from './Navbar';
import MainContent from './MainContent';
import Footer from  './Footer';
import './assets/App.css';
import { connect } from '../overmind'

const App = ({ overmind }) => {
    return(
        <div className="justify-content-center align-items-center" id="wrapper">
            <div className="justify-content-center align-items-center" id="header"><Navbar /></div>
            <div className="justify-content-center align-items-center" id="main-content"><MainContent /></div>
            <div className="justify-content-center align-items-center" id="footer"><Footer /></div>
        </div>
    )
}

export default connect(App);

/* import React, { Component } from 'react';
import GetAllItems from './components/GetAllItems';
import "./App.css"

let DEV_URL = '';

if (process.env.NODE_ENV === 'development') {
    DEV_URL  = 'http://localhost:3001';
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    async componentDidMount() {
        const res = await fetch(`${DEV_URL}/users/`);
        const users = await res.json();
        this.setState({
            users
        });
    }

    render() {
        return (
            <div className="App">
                <ul>
                {this.state.users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
                </ul>
            <GetAllItems />
            </div>
        );
    }
}

export default App; */
