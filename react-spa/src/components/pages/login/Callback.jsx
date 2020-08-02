import React from 'react';

import { connect } from './../../../overmind'

import '@atlaskit/css-reset';
import './../../assets/App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

class Callback extends React.Component {

    componentDidMount() {
        this.props.overmind.action.loginCallback();
    }

    render() {
        return(
            <Container className="justify-content-center align-items-center" id="main-content">
                <Row className="row-centered">
                    <Col className="col-centered" sm={12}>
                        <p>Please Wait...</p>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(Callback);
