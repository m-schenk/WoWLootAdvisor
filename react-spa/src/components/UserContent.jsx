import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LiveSearch from './LiveSearch';
import { DragDropContext } from 'react-beautiful-dnd/';
import './userContentCSS.css';

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
            <Container fluid bsPrefix="darkTheme">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Row>
                        <Col sm={8}>
                            Wishlist
                        </Col>
                        <Col sm={4}>
                            <LiveSearch id={this.state.containers['container-1'].id} />
                        </Col>
                    </Row>
                </DragDropContext>
            </Container>
        )
    }
}