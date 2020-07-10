import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import Badge from 'react-bootstrap/Badge'

const ItemContainer = styled.div`
    font-weight: bold;
    border: 2px solid black;
    border-radius: 4px;
    padding: 4px;
    margin-bottom: 4px;
    background-color: #262626; // #50505f;
    width: 355px;
`;

const BASE_URL = "https://classic.wowhead.com/item=";

export default class Item extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.item.id.toString()} index={this.props.id}>
                {(provided) => (
                    <ItemContainer 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <p>
                            <a href={BASE_URL+this.props.item.id} target="_blank" rel="noopener noreferrer">
                                {this.props.item.name}
                            </a>
                            &nbsp;&nbsp;
                            {this.props.item.itemCategory === "Limited" &&
                                <Badge variant="info">{this.props.item.itemCategory}</Badge>
                            }
                            {this.props.item.itemCategory === "Reserved" &&
                                <Badge variant="danger">{this.props.item.itemCategory}</Badge>
                            }
                            {this.props.item.itemCategory === "Unlimited" &&
                                <Badge variant="secondary">{this.props.item.itemCategory}</Badge>
                            }
                        </p>
                    </ItemContainer>
                )}
            </Draggable>
        );
    }
}
