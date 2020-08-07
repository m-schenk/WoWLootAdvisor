import React from 'react';
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect, useState } from './../../../overmind';

import { UnlimitedIcon, LimitedIcon, ReservedIcon } from './styledAssets';

import Alert from 'react-bootstrap/Alert';

const ItemContainerDrop = styled.div`
    font-weight: bold;
    border: 1px solid #3d3d3d;
    border-radius: 4px;
    margin: unset;
    background-color: #d9d9d9;
    width: 300px;
    height: 36px;
    box-shadow: 2px 2px 4px 0px rgba(25,25,25,1);
    vertical-align: middle;
`;

const ItemContainer = styled.div`
    display: flex;
    font-weight: bold;
    border: 1px solid #3d3d3d;
    border-radius: 4px;
    padding: 4px;
    margin: unset;
    background-color: ${props => (props.isDragging ? '#50505f' : '#262626')}; /*262626*/
    box-shadow: 2px 2px 4px 0px rgba(25,25,25,1);
    height: 36px;
    width: 300px;
    vertical-align: middle;
    justify-content: space-between;
`;

//

const BASE_URL = "https://classic.wowhead.com/item=";

class Wishlist extends React.Component {
    componentDidUpdate() {
        if (window.$WowheadPower) {
            window.$WowheadPower.refreshLinks();
        }
    }
    componentDidUpdate() {
        window.$WowheadPower.refreshLinks();
    };

    onExit = () => {
        this.props.overmind.actions.tutorial();
    }

    render() {
        if (this.props.overmind.state.wishlist['locked']) {
            return (
                <Alert variant={'danger'}>
                    Your Wishlist is locked! No more changes for you ¯\_(ツ)_/¯
                </Alert>
            )
        } else if (this.props.overmind.state.player.class === "Hunter") {
            return (
                <div className="bracketsContainer justify-content-center">
                    <Bracket id={1} />
                    <Bracket id={2} />
                    <Bracket id={3} />
                </div>
            )
        } else {
            return (
                <div className="bracketsContainer justify-content-center">
                    <Bracket id={1} />
                    <Bracket id={4} />
                    <Bracket id={3} />
                    <Bracket id={2} />
                </div>
            )
        }

    }
}

const Bracket = (props) => {
    const state = useState();

    const prio = 53 - props.id * 3
    const bracketId = 'bracket-' + props.id
    const allocPoints = state.wishlist[bracketId]['points'];

    return (
        <div className={"bracket"} id={'bracket-' + props.id}>
            <div>
                <>Remaining Allocation Points: {allocPoints}</>
            </div>
            <div>
                <div className="d-flex">
                    <ItemDroppable bracketId={bracketId} slotIdInt={1} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={2} />
                </div>
                <div className="d-flex">
                    <ItemDroppable bracketId={bracketId} slotIdInt={3} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={4} />
                </div>
                <div className="d-flex">
                    <ItemDroppable bracketId={bracketId} slotIdInt={5} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={6} />
                </div>
            </div>
        </div>
    )
}

const ItemDroppable = (props) => {
    const bracketId = props.bracketId;
    const slotIdInt = props.slotIdInt;
    return (
        <div>
            <Droppable droppableId={bracketId + '_slot-' + slotIdInt}>
                {provided => (
                    <ItemContainerDrop ref={provided.innerRef} {...provided.droppableProps}>
                        <Item bracketId={bracketId} slotIdInt={slotIdInt} />
                        {provided.placeholder}
                    </ItemContainerDrop>
                )}
            </Droppable>
        </div>
    )
}


const Item = (props) => {
    const state = useState();

    const slotId = 'slot-' + props.slotIdInt;
    const bracketId = props.bracketId;
    const slotIdInt = parseInt(props.slotIdInt);

    if ((slotIdInt > 1) && state.wishlist[bracketId]['slot-' + (slotIdInt - 1)].item !== null &&
        state.wishlist[bracketId]['slot-' + (slotIdInt - 1)].item.itemCategory === "Reserved") {
        return (
            <ItemContainer>
                <p>Locked</p>
            </ItemContainer>
        )
    } else if (state.wishlist[bracketId][slotId].item === null) {
        return (<></>)
    } else {
        return (
            <>
                <Draggable draggableId={state.wishlist[bracketId][slotId].item.id.toString() + bracketId + slotId} index={1}>
                    {(provided, snapshot) => (
                        <ItemContainer
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            isDragging={snapshot.isDragging}
                        >
                            <div>
                                <a href={BASE_URL + state.wishlist[bracketId][slotId].item.id} target="_blank" rel="noopener noreferrer">
                                    {state.wishlist[bracketId][slotId].item.name}
                                </a>
                            </div>
                            {state.wishlist[bracketId][slotId].item.itemCategory === "Reserved" &&
                                <ReservedIcon />
                            }
                            {state.wishlist[bracketId][slotId].item.itemCategory === "Limited" &&
                                <LimitedIcon />
                            }
                            {state.wishlist[bracketId][slotId].item.itemCategory === "Unlimited" &&
                                <UnlimitedIcon />
                            }
                        </ItemContainer>
                    )}
                </Draggable>
            </>
        );
    }
}

export default connect(Wishlist);
