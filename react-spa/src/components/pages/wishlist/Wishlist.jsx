import React from 'react';
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect, useState } from './../../../overmind';

import { UnlimitedIcon, LimitedIcon, ReservedIcon } from './styledAssets';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Alert from 'react-bootstrap/Alert';

const ItemContainerDrop = styled.div`
    font-weight: bold;
    border: 1px solid #3d3d3d;
    border-radius: 4px;
    background-color: #d9d9d9;
    margin: 8px;
    width: 300px;
    height: 36px;
    box-shadow: 2px 2px 4px 0px rgba(25,25,25,1);
    vertical-align: middle;
`;

const InvisibleSmallerDropLocation = styled.div`
    height: 18px;
    width: 300px;
`

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

    componentDidMount() {
        if (window.$WowheadPower) {
            window.$WowheadPower.refreshLinks();
        }
    }

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
                    <Bracketless isHunter={true}/>
                </div>
            )
        } else {
            return (
                <div className="bracketsContainer justify-content-center">
                    <Bracket id={1} />
                    <Bracket id={2} />
                    <Bracket id={3} />
                    <Bracket id={4} />
                    <Bracketless isHunter={false}/>
                </div>
            )
        }
    }
}

const Bracketless = (props) => {
    const bracketId = "bracketless";

    return (
        <div className="bracket" id={bracketId}>
            <div>
                <>Bracketless - Unlimited Allocation Points</>
            </div>
            <Col>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={1} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={2} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={3} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={4} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={5} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={6} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={7} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={8} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={9} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={10} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={11} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={12} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={13} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={14} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={15} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={16} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={17} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={18} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={19} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={20} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={21} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={22} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={23} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={24} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={25} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={26} />
                </Row>
                { props.isHunter && <>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={27} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={28} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={29} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={30} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={31} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={32} />
                </Row>
                </>}
            </Col>
        </div>
    )
}

const Bracket = (props) => {
    const state = useState();

    const bracketId = 'bracket-' + props.id;
    const allocPoints = state.wishlist[bracketId]['points'];

    return (
        <div className="bracket" id={'bracket-' + props.id}>
            <div>
                <>Bracket {props.id} - Remaining Allocation Points: {allocPoints}</>
            </div>
            <Col>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={1} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={2} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={3} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={4} />
                </Row>
                <Row className="d-flex justify-content-center">
                    <ItemDroppable bracketId={bracketId} slotIdInt={5} />
                    <ItemDroppable bracketId={bracketId} slotIdInt={6} />
                </Row>
            </Col>
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
                    <ItemContainerDrop>
                        <InvisibleSmallerDropLocation ref={provided.innerRef} {...provided.droppableProps}>
                            <Item bracketId={bracketId} slotIdInt={slotIdInt} />
                            {provided.placeholder}
                        </InvisibleSmallerDropLocation>
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

    if ((bracketId !== 'bracketless') && (slotIdInt % 2 === 0) && (state.wishlist[bracketId]['slot-' + (slotIdInt - 1)].item !== null) &&
        (state.wishlist[bracketId]['slot-' + (slotIdInt - 1)].item.itemCategory === "Reserved")) {
        return (
            <ItemContainer>
                <p>Locked</p>
            </ItemContainer>
        )
    } else if (state.wishlist[bracketId][slotId].item === null || state.wishlist[bracketId][slotId].item.id === null) {
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
                            {state.wishlist[bracketId][slotId].item.itemCategory === "Reserved" && <ReservedIcon />}
                            {state.wishlist[bracketId][slotId].item.itemCategory === "Limited" && <LimitedIcon />}
                            {state.wishlist[bracketId][slotId].item.itemCategory === "Unlimited" && <UnlimitedIcon />}
                        </ItemContainer>
                    )}
                </Draggable>
            </>
        );
    }
}

export default connect(Wishlist);
