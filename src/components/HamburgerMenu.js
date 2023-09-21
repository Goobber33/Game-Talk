import React from 'react';
import '../styles/Sidebar.css';

const HamburgerMenu = ({ isVisible, toggleSidebar }) => {
    const sidebarStyle = isVisible ? 'sidebar visible' : 'sidebar';

    return (
        <div className={sidebarStyle}>
            <div className="close-button" onClick={toggleSidebar}>X</div>
            <div><a href="/game">Game</a></div>
            <div><a href="/submit-word">Submit Word</a></div>
            <div><a href="/bug-report">Bug Report</a></div>
        </div>
    );
};

export default HamburgerMenu;
