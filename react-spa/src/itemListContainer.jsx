import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './item';

export default class ItemListContainer extends React.Component {
    render() {
        return (
            <Droppable droppableId={this.props.id}>
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {this.props.items.map((item, index) => (
                            <Item item={item} id={index} key={item.id} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}
