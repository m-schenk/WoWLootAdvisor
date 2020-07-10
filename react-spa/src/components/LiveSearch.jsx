import React from 'react';
import ItemListContainer from '../itemListContainer';
import debounce from 'lodash.debounce';
import { search } from '../jsx/liveSearchUtil';
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'

export default class LiveSearch extends React.Component {
    state = {
        items: null,
        loading: false,
        value: '',
        lang: 'en'
    };

    search = debounce(async val => {
        this.setState({ loading: true });
        const items = await search(
            `http://localhost:3000/items?query=${val}`
        );
        this.setState({ items, loading: false });
    }, 250); /* the actual function is now only called if input has not changed for 250, 
                request/respones were too small that cancel token from axios was not useful 
                to throttle, but is still in use.
            */

    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });
    };

    componentDidUpdate() {
        window.$WowheadPower.refreshLinks();
    };

    get renderItems() {
        let itemList = <h3>0 Items found.</h3>;
        if(this.state.loading) {
            itemList = <Spinner animation="border" size="sm" />;
        }
        if(this.state.items) {
            itemList = <ItemListContainer  id={this.props.id} items={this.state.items} />;
        }
        return itemList;
    };
    
    render() {
        return (
            <>
                <Form.Control size="sm"
                    value={this.state.value}
                    onChange={e => this.onChangeHandler(e)}
                    placeholder="Enter Item Name"
                />
                <div>
                    {this.renderItems}
                </div> 
            </>
        );
    }
}