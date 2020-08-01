import React from 'react';

import { connect } from './../../../overmind'

import '@atlaskit/css-reset';
import './../../assets/App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Profile extends React.Component {
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
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(Profile);
