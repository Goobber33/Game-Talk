import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../styles/NavBar.css';

const NavBar = () => {
    return (
        <Navbar expand={false} variant="light" className="justify-content-end custom-navbar">
            <Navbar.Brand href="#home">Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="text-right">
                <Nav>
                    <Nav.Link href="#game">Game</Nav.Link>
                    <Nav.Link href="#submit-word">Submit Word</Nav.Link>
                    <Nav.Link href="#bug-report">Bug Report</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
