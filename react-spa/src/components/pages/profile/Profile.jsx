import React, { useState } from 'react';

import { connect, useActions } from './../../../overmind';

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

const initialFormData = Object.freeze({
    _name: null,
    _race: null,
    _class: null,
    _role: null
});

function PlayerProfileForm() {
    const [formData, updateFormData] = useState(initialFormData);
    const actions = useActions();

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.sendProfile(formData);
    };

    return (
        <>
            <form>
                <Form.Group controlId="profile.name">
                    <Form.Label>Character name:</Form.Label>
                    <Form.Control name="_name" type="text" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="profile.class">
                    <Form.Label>Select class:</Form.Label>
                    <Form.Control as="select" name="_class" onChange={handleChange}>
                        <option>select class..</option>
                        <option value="Druid">Druid</option>
                        <option value="Hunter">Hunter</option>
                        <option value="Mage">Mage</option>
                        <option value="Paladin">Paladin</option>
                        <option value="Priest">Priest</option>
                        <option value="Rogue">Rogue</option>
                        <option value="Warlock">Warlock</option>
                        <option value="Warrior">Warrior</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select your role:</Form.Label>
                    <Form.Control as="select" name="_race" onChange={handleChange}>
                        <option>select race..</option>
                        <option value="Dwarf">Dwarf</option>
                        <option value="Gnome">Gnome</option>
                        <option value="Human">Human</option>
                        <option value="Night Elf">Night Elf</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select your role:</Form.Label>
                    <Form.Control as="select" name="_role" onChange={handleChange}>
                        <option>select role..</option>
                        <option value="DPS">DPS</option>
                        <option value="Heal">Heal</option>
                        <option value="Tank">Tank</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="warning" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </form>
        </>
    )
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        };
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
                                            <Col md={6}><label>(remove $dev) _id:</label></Col>
                                            <Col md={6}><p>{this.props.overmind.state.player._id}</p></Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}><label>(remove $dev) permissions:</label></Col>
                                            <Col md={6}><p>{this.props.overmind.state.player.permissions}</p></Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}><label>Character Name:</label></Col>
                                            <Col md={6}><b>{this.props.overmind.state.player.name}</b></Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}><label>Race:</label></Col>
                                            <Col md={6}><b>{this.props.overmind.state.player.race}</b></Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}><label>Class:</label></Col>
                                            <Col md={6}><b>{this.props.overmind.state.player.class}</b></Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}><label>Role:</label></Col>
                                            <Col md={6}><b>{this.props.overmind.state.player.role}</b></Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}><label>AQ40 Attendance:</label></Col>
                                            <Col md={6}><b>{this.props.overmind.state.player.aq_attendance}</b></Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}><label>Naxxramas Attendance:</label></Col>
                                            <Col md={6}><b>{this.props.overmind.state.player.naxx_attendance}</b></Col>
                                        </Row>
                                        <Row>
                                            <Col md={2}><p>(remove $dev_bracket1)</p></Col>
                                            <Col md={10}>{this.props.overmind.state.player.debug.bracket1.values()}</Col>
                                        </Row>
                                        <Row>
                                            <Col md={2}><p>(remove $dev_bracket2)</p></Col>
                                            <Col md={10}>{this.props.overmind.state.player.debug.bracket2.values()}</Col>
                                        </Row>
                                        <Row>
                                            <Col md={2}><p>(remove $dev_bracket3)</p></Col>
                                            <Col md={10}>{this.props.overmind.state.player.debug.bracket3.values()}</Col>
                                        </Row>
                                        <Row>
                                            <Col md={2}><p>(remove $dev_bracket4)</p></Col>
                                            <Col md={10}>{this.props.overmind.state.player.debug.bracket4.values()}</Col>
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                                <Accordion>
                                    <Card.Footer>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            Edit Profile
                                        </Accordion.Toggle>
                                    </Card.Footer>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <PlayerProfileForm />
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
