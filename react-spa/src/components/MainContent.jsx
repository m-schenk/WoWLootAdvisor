import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ItemLiveSearch from './ItemLiveSearch';
import Wishlist from './Wishlist';
import { DragDropContext } from 'react-beautiful-dnd/';
import { connect } from '../overmind';

class MainContent extends React.Component {

    onDragEnd = result => {
        console.log("this was called")
        this.props.overmind.actions.dragHandler(result);
    };

    render() {
        return(
            <Container>
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
