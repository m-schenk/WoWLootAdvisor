import React from 'react';
import ItemListContainer from './ItemListContainer';
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Droppable } from 'react-beautiful-dnd';
import { connect } from './../../../overmind';
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd'
import { tutorialSteps } from '../../tutorialSteps'

import 'shepherd.js/dist/css/shepherd.css'

const tourOptions = {
    defaultStepOptions: {
      cancelIcon: {
        enabled: true
      }
    },
    useModalOverlay: true
  };

function TButton() {
    const tour = React.useContext(ShepherdTourContext)
    return(
        <Button variant="warning" as="input" type="button" value="Tutorial" onClick={tour.start}/>
    )
}

class ItemLiveSearch extends React.Component {

    shouldComponentUpdate(nextProps) {
        return this.props.overmind !== nextProps.overmind
    }

    onChangeHandler = async e => {
        this.props.overmind.actions.searchItems(e.target.value)
    }

    componentDidUpdate() {
        if(window.$WowheadPower) {
            window.$WowheadPower.refreshLinks();
        }
    }

    triggerTutorial = () => {
        this.props.overmind.actions.tutorial();
    }
    
    sendWishlist = () => {
        this.props.overmind.actions.sendWishlist()
        // .then(event => {
        //     toast(event, {
        //         className: 'drag-event-toast',
        //         bodyClassName: 'drag-event-toast-textbody',
        //         progressClassName: 'drag-event-toast-progress-bar',
        //         position: toast.POSITION.TOP_CENTER,
        //     });
        // });
    }

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
                <div className="control">
                    <Button variant="warning" as="input" type="submit" value="Submit" onClick={ () => { this.sendWishlist() } } />
                    <Button variant="warning" as="input" type="reset" value="Reset" />  
                    <ShepherdTour steps={tutorialSteps} tourOptions={tourOptions}>
                        <TButton />
                    </ShepherdTour>
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
