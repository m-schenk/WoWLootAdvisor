import React from 'react';

import { connect } from './../../../overmind'

import '@atlaskit/css-reset';
import './../../assets/App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

class Login extends React.Component {
    render() {
        return(
            <Container className="justify-content-center align-items-center" id="main-content">
                <Row className="row-centered">
                    <Col className="col-centered" sm={12}>
                        <Button variant="info" as="input" type="button" value="Login" onClick={this.props.overmind.actions.login}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(Login);
