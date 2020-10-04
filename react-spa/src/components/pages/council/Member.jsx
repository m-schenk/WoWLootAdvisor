import React from 'react';

import { connect } from './../../../overmind'

import '@atlaskit/css-reset';
import './../../assets/App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player_wishlist: null,
            error: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        this.props.overmind.actions.loadMember(this.props.member)
            .then(
                (data) => {
                    this.setState({
                        player_wishlist: data,
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
                <Container className="justify-content-center align-items-center" id="main-content">
                    <Row className="row-centered">
                        <Col className="col-centered" sm={12}>
                            <p>{this.props.member}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Bracket 1</p>
                            <p>{this.state.player_wishlist["bracket-1"]["slot-1"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-1"]["slot-2"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-1"]["slot-3"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-1"]["slot-4"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-1"]["slot-5"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-1"]["slot-6"].item.name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Bracket 2</p>
                            <p>{this.state.player_wishlist["bracket-2"]["slot-1"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-2"]["slot-2"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-2"]["slot-3"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-2"]["slot-4"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-2"]["slot-5"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-2"]["slot-6"].item.name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Bracket 3</p>
                            <p>{this.state.player_wishlist["bracket-3"]["slot-1"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-3"]["slot-2"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-3"]["slot-3"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-3"]["slot-4"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-3"]["slot-5"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-3"]["slot-6"].item.name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Bracket 4</p>
                            <p>{this.state.player_wishlist["bracket-4"]["slot-1"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-4"]["slot-2"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-4"]["slot-3"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-4"]["slot-4"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-4"]["slot-5"].item.name}</p>
                            <p>{this.state.player_wishlist["bracket-4"]["slot-6"].item.name}</p>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default connect(Member);
