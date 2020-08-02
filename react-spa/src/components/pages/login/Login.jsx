import React from 'react';

import { connect } from './../../../overmind'

import '@atlaskit/css-reset';
import './../../assets/App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

class Login extends React.Component {

    auth() {
        window.location = 'http://raegae.maarten.ch:3000/api/discord/login'
    }

    render() {
        return(
            <Container className="justify-content-center align-items-center" id="main-content">
                <Row className="row-centered">
                    <Col className="col-centered" sm={12}>
                        <Button variant="info" as="input" type="button" value="Login" onClick={() => { this.auth() }}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(Login);
