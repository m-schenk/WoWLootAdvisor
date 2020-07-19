import React from 'react';
import ItemListContainer from './ItemListContainer';
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import { Droppable } from 'react-beautiful-dnd';
import { connect } from '../overmind';

class ItemLiveSearch extends React.Component {
    
    shouldComponentUpdate(nextProps) {
        return this.props.overmind !== nextProps.overmind
    }

    onChangeHandler = async e => {
        this.props.overmind.actions.searchItems(e.target.value)
    };

    componentDidUpdate() {
        window.$WowheadPower.refreshLinks();
    };

    get renderItems() {
        let itemList = <h3>0 Items found.</h3>;
        if(this.props.overmind.state.liveSearch['isSearching']) {
            itemList = <Spinner animation="border" size="sm" />;
        }
        if(this.props.overmind.state.liveSearch['result']) {
            itemList = <ItemListContainer id={this.props.id} />;
        }
        return itemList;
    };
    
    render() {
        return (
            <div className="live-search">
                <label>Remove Item:</label>
                <Droppable droppableId="delete-zone">
                    {provided => (
                        <div className="delete-item-zone" ref={provided.innerRef} {...provided.droppableProps}>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <br />
                <label>Item Search:</label>
                <Form.Control size="sm"
                    value={this.props.overmind.state.liveSearch['query']}
                    onChange={e => this.onChangeHandler(e)}
                    placeholder="Enter Item Name"
                />
                {this.renderItems}

            </div>
        );
    }
}

export default connect(ItemLiveSearch)
