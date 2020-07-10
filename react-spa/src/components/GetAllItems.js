import React, { Component } from 'react';

let DEV_URL = '';

const baseURL = "https://classic.wowhead.com/item=";

if (process.env.NODE_ENV === 'development') {
    DEV_URL  = 'http://localhost:3000';
}

export default class GetAllItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    async componentDidMount() {
        const res = await fetch(`${DEV_URL}/items/`);
        const items = await res.json();
        this.setState({
            items
        });
    }

    render() {
        return (
            <div className="GetAllItems">
                <p>
                {this.state.items.map(item => (
                    <a href={baseURL+item.id} key={item.id}>[{item.name}]</a>
                ))}
                </p>
            </div>
        );
    }
}
