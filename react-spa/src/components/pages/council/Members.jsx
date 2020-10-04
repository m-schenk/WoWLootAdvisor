import React from 'react';

import { connect } from './../../../overmind'

import '@atlaskit/css-reset';
import './../../assets/App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Member from './Member';

import { Link } from 'react-router-dom';



class Members extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        this.props.overmind.actions.loadMembers()
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
                <Container className="justify-content-center align-items-center" id="main-content">
                    <Row className="row-centered">
                        <Col className="col-centered" sm={12}>
                            <p>Council Members Page</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link component={Member} ></Link> <Member member={"Malvida"} />
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default connect(Members);
