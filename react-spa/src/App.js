import React from 'react';
import UserApp from './apps/UserApp.jsx';
import '@atlaskit/css-reset';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <UserApp />
        );
    }
}

export default App;










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
