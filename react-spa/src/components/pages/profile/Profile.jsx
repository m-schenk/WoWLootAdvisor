import React from 'react';

import { connect } from './../../../overmind';

import '@atlaskit/css-reset';
import './../../assets/App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Profile extends React.Component {

    componentDidMount() {
        if(!this.props.overmind.state.player.loaded) {
            this.props.overmind.actions.getPlayerProfile()
        }
    }

    render() {
        return(
            <Container className="justify-content-center align-items-center" id="main-content">
                <Row className="row-centered">
                    <Col className="col-centered" sm={12}>
                        <p>{this.props.overmind.state.player.name}</p>
                        <p>{this.props.overmind.state.player.class}</p>
                        <p>{this.props.overmind.state.player.race}</p>
                        <p>{this.props.overmind.state.player.talent}</p>
                        <p>{this.props.overmind.state.player.aq_attendance}</p>
                        <p>{this.props.overmind.state.player.naxx_attendance}</p>
                        <p>{this.props.overmind.state.player.wishlist}</p>
                        <Accordion>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Click me!
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>Hello! I'm the body</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(Profile);
