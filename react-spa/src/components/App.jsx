import React from 'react';
import '@atlaskit/css-reset';
import Navbar from './Navbar';
import MainContent from './MainContent';
import Footer from  './Footer';
import './assets/App.css';
import { connect } from '../overmind'

const App = ({ overmind }) => {
    return(
        <div className="justify-content-center align-items-center" id="wrapper">
            <div className="justify-content-center align-items-center" id="header"><Navbar /></div>
            <div className="justify-content-center align-items-center" id="main-content"><MainContent /></div>
            <div className="justify-content-center align-items-center" id="footer"><Footer /></div>
        </div>
    )
}

export default connect(App);
