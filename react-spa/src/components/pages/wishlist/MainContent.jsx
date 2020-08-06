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

class MainContent extends React.Component {

    onDragEnd = (result) => {
        console.log("this was called")
        this.props.overmind.actions.dragHandler(result);
        window.$WowheadPower.refreshLinks();
    };

    render() {
        return(
            <Container className="justify-content-center align-items-center" id="main-content">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Row className="row-centered">
                        <Col className="col-centered" sm={7}>
                            <Wishlist />
                        </Col>
                        <Col className="col-centered" sm={5}>
                            <ItemLiveSearch id={this.props.overmind.state.liveSearch['id']} />
                        </Col>
                    </Row>
                </DragDropContext>
            </Container>
        )
    }
}

export default connect(MainContent);
