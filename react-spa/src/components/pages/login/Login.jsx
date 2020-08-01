import React from 'react';

import { connect } from './../../../overmind'

import '@atlaskit/css-reset';
import './../../assets/App.css';

import Button from 'react-bootstrap/Button'

class Login extends React.Component {
    render() {
        return(
            <Button variant="info" as="input" type="button" value="Login" onClick={this.props.overmind.actions.login}/>
        )
    }
}

export default connect(Login);
