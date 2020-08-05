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
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        };
    }

    shouldComponentUpdate(nextProps) {
        return this.props.overmind !== nextProps.overmind
    }

    componentDidMount() {
        this.props.overmind.actions.loadProfile()
        .then(
            (result) => {
                this.setState({
                    isLoaded: true
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container className="justify-content-center align-items-center" id="main-content">
                    <Row className="row-centered">
                        <Col className="col-centered" sm={12}>
                            {!this.props.overmind.state.player.isComplete && <Alert variant={'danger'}>
                                Your profile seems not complete, please edit your profile before you start creating a wishlist
                            </Alert>}
                            <p>{this.props.overmind.state.player._id}</p>
                            <p>{this.props.overmind.state.player.name}</p>
                            <p>{this.props.overmind.state.player.class}</p>
                            <p>{this.props.overmind.state.player.race}</p>
                            <p>{this.props.overmind.state.player.role}</p>
                            <p>{this.props.overmind.state.player.aq_attendance}</p>
                            <p>{this.props.overmind.state.player.naxx_attendance}</p>
                            <Accordion>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            Edit Profile
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <Form>
                                                <Form.Group controlId="profile.name">
                                                    <Form.Label>Character name:</Form.Label>
                                                    <Form.Control type="text" />
                                                </Form.Group>
                                                <Form.Group controlId="profile.class" onChange={this.classChange}>
                                                    <Form.Label>Select class:</Form.Label>
                                                    <Form.Control as="select">
                                                        <option>Druid</option>
                                                        <option>Hunter</option>
                                                        <option>Mage</option>
                                                        <option>Paladin</option>
                                                        <option>Priest</option>
                                                        <option>Rogue</option>
                                                        <option>Warlock</option>
                                                        <option>Warrior</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="profile.class">
                                                    <Form.Label>Select your role:</Form.Label>
                                                    <Form.Control as="select">
                                                        <option>Dwarf</option>
                                                        <option>Gnome</option>
                                                        <option>Human</option>
                                                        <option>Night Elf</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="profile.class">
                                                    <Form.Label>Select your role:</Form.Label>
                                                    <Form.Control as="select">
                                                        <option>DPS</option>
                                                        <option>Heal</option>
                                                        <option>Tank</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Button variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </Form>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default connect(Profile);
