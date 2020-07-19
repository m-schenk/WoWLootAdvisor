import React from 'react';
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from '../overmind';

const ItemContainerDrop = styled.div`
    font-weight: bold;
    border: 1px solid #3d3d3d;
    border-radius: 4px;
    margin: unset;
    background-color: #d9d9d9;
    width: 300px;
    height: 32px;
    box-shadow: 2px 2px 4px 0px rgba(25,25,25,1);
    vertical-align: middle;
`;

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

//{ this.renderBracket('bracketless', hunter)}

const BASE_URL = "https://classic.wowhead.com/item=";

class Wishlist extends React.Component {

    componentDidUpdate() {
        window.$WowheadPower.refreshLinks();
    };

    renderWishlist() {
        if(this.props.overmind.state.wishlist['locked']) {
            return (<p>Your Wishlist is locked! No more changes for you ¯\_(ツ)_/¯</p>)
        } else {
            const hunter = (this.props.overmind.state.player.class === "hunter") 
            return(
                <>
                    {this.renderBracket('bracket-1', hunter)}
                    {this.renderBracket('bracket-2', hunter)}
                    {this.renderBracket('bracket-3', hunter)}
                    {this.renderBracket('bracket-4', hunter)}
                </>
            )
            
            
        }
    }

    renderBracket(bracketId, hunter) {
        let prioStart = this.props.overmind.state.wishlist[bracketId]['prio-start'];
        const allocPoints = this.props.overmind.state.wishlist[bracketId]['points'];
        if(hunter && bracketId === "bracket-4") return
        if(hunter && bracketId === "bracketless") {
            prioStart = prioStart+3;
        }
        return(
            <table className={bracketId+" styled-table"} id={bracketId}>
                <thead>
                    <tr className="styled-table">
                        <th className="styled-table" xl={12}>Remaining Allocation Points: {(hunter ? allocPoints-1 : allocPoints)}</th>
                    </tr>
                </thead>
                <tbody className="styled-table">
                    <tr className="styled-table">
                        <td className="styled-table" xl={12}>
                            {this.renderBracketRow(bracketId, prioStart, 1)}
                            {this.renderBracketRow(bracketId, prioStart-1, 3)}
                            {this.renderBracketRow(bracketId, prioStart-2, 5)}
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    renderBracketRow(bracketId, p, r) {
        return(
            <table>
                <tbody>
                    <tr className="styled-table">
                        <td className="styled-table">
                            {p}
                        </td>
                        <td className="styled-table justify-content-center align-items-center" xl={5} >
                            <Droppable droppableId={bracketId+'_slot-'+r}>
                                {provided => (
                                    <ItemContainerDrop ref={provided.innerRef} {...provided.droppableProps}>
                                        {this.renderItem(bracketId, 'slot-'+r)}
                                        {provided.placeholder}
                                    </ItemContainerDrop>
                                )}
                            </Droppable>
                        </td>
                        <td className="styled-table justify-content-center align-items-center" xl={5}>
                            <Droppable droppableId={bracketId+'_slot-'+(r+1)}>
                                {provided => (
                                    <ItemContainerDrop ref={provided.innerRef} {...provided.droppableProps}>
                                        {this.renderItem(bracketId, 'slot-'+(r+1))}
                                        {provided.placeholder}
                                    </ItemContainerDrop>
                                )}
                            </Droppable>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    renderItem(bracketId, slotId) {
        if (this.props.overmind.state.wishlist[bracketId][slotId].item === null) {
            return <></>
        }
        return (
            <>
                <Draggable draggableId={this.props.overmind.state.wishlist[bracketId][slotId].item.id.toString()+bracketId+slotId} index={1}>
                    {(provided, snapshot) => (
                        <ItemContainer 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            isDragging={snapshot.isDragging}
                        >
                            <div>
                                <a href={BASE_URL+this.props.overmind.state.wishlist[bracketId][slotId].item.id} target="_blank" rel="noopener noreferrer">
                                    {this.props.overmind.state.wishlist[bracketId][slotId].item.name}
                                </a>
                            </div>
                            {this.props.overmind.state.wishlist[bracketId][slotId].item.itemCategory === "Reserved" &&
                                <div id={"circle-"+this.props.overmind.state.wishlist[bracketId][slotId].item.itemCategory}></div>
                            }
                            {this.props.overmind.state.wishlist[bracketId][slotId].item.itemCategory === "Limited" &&
                                <div id={"circle-"+this.props.overmind.state.wishlist[bracketId][slotId].item.itemCategory}></div>
                            }
                            {this.props.overmind.state.wishlist[bracketId][slotId].item.itemCategory === "Unlimited" &&
                                <div id={"circle-"+this.props.overmind.state.wishlist[bracketId][slotId].item.itemCategory}></div>
                            }
                            
                        </ItemContainer>
                    )}
                </Draggable>
            </>
        );
    }

    render() {
        return (
            <div className="bracketsContainer">
                {this.renderWishlist()}
            </div>
        )
    }
}

export default connect(Wishlist);


{/*                                     { Object.keys(this.props.overmind.state.liveSearch['result']).map((objectId, index) => {

                                    { if(this.props.overmind.state.wishlist[bracketId]['slot-'+(r+1)] !== null) {
                                        <Item></Item>
                                    }
                                    } */}