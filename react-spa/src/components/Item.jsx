import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from '../overmind';

const ItemContainer = styled.div`
    display: flex;
    font-weight: bold;
    border: 1px solid #3d3d3d; /*;*/
    border-radius: 4px;
    padding: 4px;
    margin-bottom: 6px;
    background-color: ${props => (props.isDragging ? '#50505f' : '#262626')}; /*262626*/
    box-shadow: 2px 2px 4px 0px rgba(25,25,25,1);
    width: 300px;
    justify-content: space-between;
`;

const BASE_URL = "https://classic.wowhead.com/item=";

class Item extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.overmind.state.itemSearchResult[this.props.objectId].id.toString()} index={this.props.index}>
                {(provided, snapshot) => (
                    <ItemContainer 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                    >
                        <div>
                            <a href={BASE_URL+this.props.overmind.state.itemSearchResult[this.props.objectId].id} target="_blank" rel="noopener noreferrer">
                                {this.props.overmind.state.itemSearchResult[this.props.objectId].name}
                            </a>
                        </div>
                        {this.props.overmind.state.itemSearchResult[this.props.objectId].itemCategory === "Reserved" &&
                            <div id={"circle-"+this.props.overmind.state.itemSearchResult[this.props.objectId].itemCategory}></div>
                        }
                        {this.props.overmind.state.itemSearchResult[this.props.objectId].itemCategory === "Limited" &&
                            <div id={"circle-"+this.props.overmind.state.itemSearchResult[this.props.objectId].itemCategory}></div>
                        }
                        {this.props.overmind.state.itemSearchResult[this.props.objectId].itemCategory === "Unlimited" &&
                            <div id={"circle-"+this.props.overmind.state.itemSearchResult[this.props.objectId].itemCategory}></div>
                        }
                    </ItemContainer>
                )}
            </Draggable>
        );
    }
}

export default connect(Item);
