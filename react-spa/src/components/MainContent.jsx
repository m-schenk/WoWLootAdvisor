import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ItemLiveSearch from './ItemLiveSearch';
import Wishlist from './Wishlist';
import { DragDropContext } from 'react-beautiful-dnd/';

export default class UserContent extends React.Component {
    state = {
        containers: {
            'container-1': {
                id: 'container-1',
                itemIds: [],
            },
            'wishlist': {
                id: 'wishlist',
                itemIds: [],
            }
        },
        containerOrder: ['container-1', 'wishlist']
    };

    addItemToContainers = ({containerId, itemId}) => {
        const container = this.state.containers[containerId];
        const itemIds = container.itemIds;
        const newContainer = {
            ...container,
            itemIds: itemIds.push(itemId),
        };

        const newState = {
            ...this.state,
            containers: {
                ...this.state.containers,
                [newContainer.id]: newContainer,
            },
        };
        this.setState(newState);
    }
    

    onDragEnd = result => {
        console.log("this was called")
        const { destination, source, draggableId } = result;

        console.log(destination)
        console.log(source)
        console.log(draggableId)

        if(!destination) {
            return;
        }

        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const container = this.state.containers[source.droppableId];
        const newItemIds = Array.from(container.itemIds);
        newItemIds.splice(source.index, 1);
        newItemIds.splice(destination.index, 0, draggableId);

        const newContainer = {
            ...container,
            itemIds: newItemIds,
        };

        const newState = {
            ...this.state,
            containers: {
                ...this.state.containers,
                [newContainer.id]: newContainer,
            },
        };

        this.setState(newState);
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
                            <ItemLiveSearch id={this.state.containers['container-1'].id} />
                        </Col>
                    </Row>
                </DragDropContext>
            </Container>
        )
    }
}