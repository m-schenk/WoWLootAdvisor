import React from 'react';
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd';
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

class Wishlist extends React.Component {

    wishlistRow(bracketId, p, r) {
        return(
            <table>
                <tbody>
                    <tr className="styled-table">
                        <td className="styled-table">
                            {p}
                        </td>
                        <td className="styled-table justify-content-center align-items-center" xl={5} >
                            <Droppable droppableId={bracketId+'-slot-'+r}>
                                {provided => (
                                    <ItemContainerDrop ref={provided.innerRef} {...provided.droppableProps}>
                                        {provided.placeholder}
                                    </ItemContainerDrop>
                                )}
                            </Droppable>
                        </td>
                        <td className="styled-table justify-content-center align-items-center" xl={5}>
                            <Droppable droppableId={bracketId+'-slot-'+r+1}>
                                {provided => (
                                    <ItemContainerDrop ref={provided.innerRef} {...provided.droppableProps}>
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

    renderBracket(bracketId, pstart) {
        return(
            <table className={bracketId+" styled-table"} id={bracketId}>
                <thead>
                    <tr className="styled-table">
                        <th className="styled-table" xl={12}>Remaining Allocation Points: 3</th>
                    </tr>
                </thead>
                <tbody className="styled-table">
                    <tr className="styled-table">
                        <td className="styled-table" xl={12}>
                            {this.wishlistRow(bracketId, pstart, 1)}
                            {this.wishlistRow(bracketId, pstart-1, 3)}
                            {this.wishlistRow(bracketId, pstart-2, 5)}
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div className="bracketsContainer">
                {this.renderBracket("bracket-1", 50)}
                {this.renderBracket("bracket-2", 47)}
                {this.renderBracket("bracket-3", 44)}
                {this.renderBracket("bracket-4", 41)}
                {this.renderBracket("bracketless", 30)}
            </div>
        )
    }
}

export default connect(Wishlist);
