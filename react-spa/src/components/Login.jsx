import React from 'react';
import './assets/App.css';
import { connect } from '../overmind'
import Button from 'react-bootstrap/Button'

class Login extends React.Component {
    render() {
        return(
            <Button variant="info" as="input" type="button" value="Login" onClick={this.props.overmind.actions.login}/>
        )
    }
}

export default connect(Login);
