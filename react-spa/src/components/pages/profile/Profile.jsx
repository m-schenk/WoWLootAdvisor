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

    handleSubmit = (event) => {
        event.preventDefault();
        const data = JSON.stringify(new JSONFormData(event.target).formData);
        console.log(data)
        this.props.overmind.actions.sendProfile(data);
    }

    componentDidMount() {
        this.props.overmind.actions.loadProfile()
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
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
                <Container className="justify-content-center" id="main-content">
                    <Row>
                        <Col className="col-centered" sm={12}>
                            {!this.props.overmind.state.player.isComplete && <Alert variant={'danger'}>
                                Your profile seems not complete, please edit your profile before you start creating a wishlist
                            </Alert>}
                            <Card>
                                <Card.Header>Player Profile</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <Row>
                                            <Col md={6}>
                                                <label>(remove $dev) _id:</label>
                                            </Col>
                                            <Col md={6}>
                                                <p>{this.props.overmind.state.player._id}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <label>Character Name:</label>
                                            </Col>

                                            <Col md={6}>
                                                <b>{this.props.overmind.state.player.name}</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <label>Race:</label>
                                            </Col>
                                            <Col md={6}>
                                                <b>{this.props.overmind.state.player.race}</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <label>Class:</label>
                                            </Col>
                                            <Col md={6}>
                                                <b>{this.props.overmind.state.player.class}</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <label>Role:</label>
                                            </Col>
                                            <Col md={6}>
                                                <b>{this.props.overmind.state.player.role}</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <label>aq_attendance:</label>
                                            </Col>
                                            <Col md={6}>
                                                <b>{this.props.overmind.state.player.aq_attendance}</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <label>naxx_attendance:</label>
                                            </Col>
                                            <Col md={6}>
                                                <b>{this.props.overmind.state.player.naxx_attendance}</b>
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                                <Accordion>
                                    
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                Edit Profile
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <Form onSubmit={(e) => { this.handleSubmit(e) }}>
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
                                                    <Button variant="warning" type="submit">
                                                        Submit
                                                    </Button>
                                                </Form>
                                            </Card.Body>
                                        </Accordion.Collapse>

                                </Accordion>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default connect(Profile);
