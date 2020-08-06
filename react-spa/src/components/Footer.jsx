import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

export default class Footer extends React.Component {
    render() {
        return(
            <Navbar className="justify-content-center" bg="dark" variant="dark" expand="lg">
                <div className="text-center align-items-center">
                    <h5 className="midText">disclaimer - &copy; 2020 RäGä Eww...</h5>  
                    <p className="smallText">&copy; 2004 Blizzard Entertainment, Inc. All rights reserved. 
                    World of Warcraft, Warcraft and Blizzard Entertainment are 
                    trademarks or registered trademarks of Blizzard Entertainment, 
                    Inc. in the U.S. and/or other countries.</p>
                </div>
            </Navbar>
        )
    }
}
