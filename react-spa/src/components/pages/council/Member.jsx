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
            data: null,
            error: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        this.props.overmind.actions.loadMember(this.props.member)
            .then(
                (data) => {
                    this.setState({
                        data: data,
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
                            <p>{this.state.data}</p>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default connect(Member);
