import React from 'react';
import UserNavbar from '../components/UserNavbar'
import UserContent from '../components/UserContent'
import Footer from  '../components/Footer'

export default class UserApp extends React.Component {
    render() {
        return(
            <div id="wrapper">
                <div id="header"><UserNavbar /></div>
                <div id="main-content"><UserContent /></div>
                <div id="footer"><Footer /></div>
            </div>
        )
    }
}