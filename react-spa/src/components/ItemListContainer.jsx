import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';
import { connect } from '../overmind';

class ItemListContainer extends React.Component {
    render() {
        return (
            <Droppable 
                droppableId={this.props.id}
                isDropDisabled={true}
            >
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        { Object.keys(this.props.overmind.state.liveSearch['result'])
                            .map((objectId, index) => {
                                if(index > 15) {
                                    return <></>
                                } else {
                                    return (<Item objectId={objectId} key={this.props.overmind.state.liveSearch['result'][objectId].id} index={index}/>)
                                }
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
