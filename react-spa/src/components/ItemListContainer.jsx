import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';
import { connect } from '../overmind';

class ItemListContainer extends React.Component {
    render() {
        return (
            <Droppable droppableId={this.props.id}>
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        { Object.keys(this.props.overmind.state.itemSearchResult).map((objectId, index) => {
                                return (<Item objectId={objectId} key={this.props.overmind.state.itemSearchResult[objectId].id} index={index}/>)
                                //return(<ItemContainer><a href={BASE_URL+this.props.overmind.state.itemSearchResult[id].id}>{this.props.overmind.state.itemSearchResult[id].name}</a></ItemContainer>)
                            })
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}

export default connect(ItemListContainer);
