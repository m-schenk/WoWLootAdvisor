import React from 'react';
import ItemListContainer from './ItemListContainer';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Droppable } from 'react-beautiful-dnd';
import { connect } from './../../../overmind';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ItemLiveSearch extends React.Component {

    shouldComponentUpdate(nextProps) {
        return this.props.overmind !== nextProps.overmind;
    }

    onChangeHandler = async e => {
        this.props.overmind.actions.searchItems(e.target.value);
    }

    componentDidUpdate() {
        if (window.$WowheadPower) {
            window.$WowheadPower.refreshLinks();
        }
    }

    triggerTutorial = () => {
        this.props.overmind.actions.tutorial();
    }

    saveWishlist = async () => {
        const event = await this.props.overmind.actions.saveWishlist();
        toast(event, {
            className: 'drag-event-toast',
            bodyClassName: 'drag-event-toast-textbody',
            progressClassName: 'drag-event-toast-progress-bar',
            position: toast.POSITION.TOP_CENTER,
        });
    }

    loadWishlist = async () => {
        const event = await this.props.overmind.actions.loadWishlist();
        toast(event, {
            className: 'drag-event-toast',
            bodyClassName: 'drag-event-toast-textbody',
            progressClassName: 'drag-event-toast-progress-bar',
            position: toast.POSITION.TOP_CENTER,
        });
    }

    get renderItems() {
        let itemList = <h3>0 Items found.</h3>;
        if (this.props.overmind.state.liveSearch['isSearching']) {
            itemList = <Spinner animation="border" size="sm" />;
        }
        if (this.props.overmind.state.liveSearch['result']) {
            itemList = <ItemListContainer id={this.props.id} />;
        }
        return itemList;
    };

    render() {
        return (
            <div className="live-search pos-sticky-20">
                <div className="control">
                    <Button variant="warning" as="input" type="submit" value="Save" onClick={() => { this.saveWishlist() }} />
                    <Button variant="warning" as="input" type="submit" value="Load" onClick={() => { this.loadWishlist() }} />
                </div>
                <label className="label-livesearch">Remove Item:</label>
                <Droppable droppableId="delete-zone">
                    {provided => (
                        <div className="delete-item-zone" ref={provided.innerRef} {...provided.droppableProps}>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <br />
                <label className="label-livesearch">Item Search:</label>
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
