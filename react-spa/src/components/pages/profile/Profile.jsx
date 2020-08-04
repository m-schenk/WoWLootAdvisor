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

class Profile extends React.Component {

    talents = <><option>Spec 1</option><option>Spec 2</option><option>Spec 3</option></>

    componentDidMount() {
        if(!this.props.overmind.state.player.loaded) {
            this.props.overmind.actions.getPlayerProfile()
            this.props.overmind.actions.isProfileComplete();
        }
    }

    classChange(event) {
        const _class = event.target.value
        switch (_class) {
            case 'Druid':
                this._class = (<>
                    <option>Balance</option>
                    <option>Feral Combat</option>
                    <option>Restoration</option>
                </>)
            case 'Hunter':
                this._class = (<>
                    <option>Beast Mastery</option>
                    <option>Marksmanship</option>
                    <option>Survival</option>
                </>)
            case 'Mage':
                this._class =  <>
                    <option>Arcance</option>
                    <option>Fire</option>
                    <option>Frost</option>
                </>)
            case 'Paladin':
                this._class = (<>
                    <option>Holy</option>
                    <option>Protection</option>
                    <option>Retribution</option>
                </>)
            case 'Priest':
                this._class = (<>
                    <option>Discipline</option>
                    <option>Holy</option>
                    <option>Shadow</option>
                </>)
            case 'Rogue':
                this._class = (<>
                    <option>Assassination</option>
                    <option>Combat</option>
                    <option>Subtlety</option>
                </>)
            case 'Warlock':
                this._class = (<>
                    <option>Affliction</option>
                    <option>Demonology</option>
                    <option>Destruction</option>
                </>)
            case 'Warrior':
                this._class = (<>
                    <option>Arms</option>
                    <option>Fury</option>
                    <option>Protection</option>
                </>)
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
                                                <Form.Label>Select class</Form.Label>
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
                                                <Form.Label>Select talent spec</Form.Label>
                                                <Form.Control as="select">
                                                    {re}
                                                </Form.Control>
                                            </Form.Group>
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

export default connect(Profile);
