import React from 'react';
import Navbar from 'react-bootstrap/navbar';
import Nav from 'react-bootstrap/nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

export default class UserNavbar extends React.Component {
    render() {
        return(
            <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
                <Image src={require("./assets/logo128x64.png")} />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Navbar.Brand href="#profil">$playername</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#profil">Profil</Nav.Link>
                    <Nav.Link href="#wishlist">Wishlist</Nav.Link>
                    <NavDropdown title="Council" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}