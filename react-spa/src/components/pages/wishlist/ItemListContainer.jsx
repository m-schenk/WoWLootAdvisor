import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';
import { connect } from './../../../overmind';

const key=123;

class ItemListContainer extends React.Component {
    render() {
        return (
            <Droppable
                key={key}
                droppableId={this.props.id}
                isDropDisabled={true}
            >
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        { Object.keys(this.props.overmind.state.liveSearch['result'])
                            .map((objectId, index) => {
                                return (<Item objectId={objectId} key={this.props.overmind.state.liveSearch['result'][objectId].id} index={index}/>)
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
