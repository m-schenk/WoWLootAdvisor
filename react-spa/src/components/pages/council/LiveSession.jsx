import React from 'react';

import { connect } from './../../../overmind'

import '@atlaskit/css-reset';
import './../../assets/App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class LiveSession extends React.Component {
    render() {
        return(
            <Container className="justify-content-center align-items-center" id="main-content">
                <Row className="row-centered">
                    <Col className="col-centered" sm={12}>
                        <p>Council LiveSession Page</p>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(LiveSession);
