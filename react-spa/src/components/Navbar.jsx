import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from '../overmind';

// react bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

class UserNavbar extends React.Component {
    render() {
        return(
            <React.Fragment>
                <Navbar collapseOnSelect sticky="top" bg="dark" variant="dark" expand="lg">
                    <Image src={require("./assets/logo128x64.png")} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Navbar.Brand as={Link} to="/profile">{(this.props.overmind.state.player.name != null) ? this.props.overmind.state.player.name : 'Profile'}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/wishlist">Wishlist</Nav.Link>
                        {(this.props.overmind.state.player.permissions === 'council') ? 
                        <NavDropdown title="Council" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/council/members">Members</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/council/raidhistory">Raid History</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/profile">Raid Live Session</NavDropdown.Item>
                        </NavDropdown>
                         : <></>}
                        </Nav>
                    </Navbar.Collapse>
                    <Nav.Link className="justify-content-end" href="http://raegae.maarten.ch:3000/api/player/logout">Logout</Nav.Link>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default connect(UserNavbar);
