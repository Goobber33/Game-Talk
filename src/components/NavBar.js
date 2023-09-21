import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import SearchBar from './SearchBar';
import HamburgerMenu from './HamburgerMenu';
import '../styles/NavBar.css';

const NavBar = ({ setResults, term, setTerm }) => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <Navbar expand={false} variant="light" className="custom-navbar d-flex">
                <div className="flex-grow-1">
                    <Navbar.Brand href="#home">Logo</Navbar.Brand>
                </div>
                <div className="flex-grow-1 d-flex justify-content-center">
                    <SearchBar setResults={setResults} term={term} setTerm={setTerm} />
                </div>
                <div className="flex-grow-1 d-flex justify-content-end">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar} />
                </div>
            </Navbar>
            <HamburgerMenu isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
        </>
    );
}

export default NavBar;
