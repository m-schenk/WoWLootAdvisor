import React from 'react';

import { connect } from './../../../overmind'
import { DragDropContext } from 'react-beautiful-dnd/';

import '@atlaskit/css-reset';
import './../../assets/App.css';

import Wishlist from './Wishlist';
import ItemLiveSearch from './ItemLiveSearch';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        };
    }

    onDragEnd = async (result) => {
        await this.props.overmind.actions.dragHandler(result)
            .then(event => {
                if (window.$WowheadPower) {
                    window.$WowheadPower.refreshLinks();
                }
                toast(event, {
                    className: 'drag-event-toast',
                    bodyClassName: 'drag-event-toast-textbody',
                    progressClassName: 'drag-event-toast-progress-bar',
                    position: toast.POSITION.TOP_CENTER,
                });
            });
    };

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
            if (!this.props.overmind.state.player.isComplete) {
                return (
                    <Container className="justify-content-center" id="main-content">
                        <Alert variant={'danger'}>
                            Your profile is not complete, please check the profile tab before you start creating a wishlist!
                    </Alert>
                    </Container>
                )
            } else {
                return (
                    <Container className="justify-content-center" id="main-content">
                        <ToastContainer draggable={false} autoClose={5000} />
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Row className="row-centered">
                                <Col className="justify-content-center" sm={8}>
                                    <Wishlist />
                                </Col>
                                <Col className="justify-content-center" sm={4}>
                                    <ItemLiveSearch id={this.props.overmind.state.liveSearch['id']} />
                                </Col>
                            </Row>
                        </DragDropContext>
                    </Container>
                )
            }
        }
    }
}

export default connect(MainContent);
