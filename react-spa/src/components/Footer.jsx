import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Container from 'react-bootstrap/Container'

export default class Footer extends React.Component {
    render() {
        return(
            <Navbar className="justify-content-center align-items-center" bg="dark" variant="dark">
                <Container className="reset">
                    <NavbarBrand>
                        <h5 className="midText">disclaimer - &copy; 2020 RäGä Eww...</h5>
                    </NavbarBrand>   
                    <p className="smallText">&copy; 2004 Blizzard Entertainment, Inc. All rights reserved. 
                    World of Warcraft, Warcraft and Blizzard Entertainment are 
                    trademarks or registered trademarks of Blizzard Entertainment, 
                    Inc. in the U.S. and/or other countries.</p>
                </Container>
            </Navbar>
        )
    }
}
