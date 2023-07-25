import React from 'react';

const HamburgerMenu = ({ isVisible }) => {
    return isVisible ? (
        <div style={{ marginTop: '10px' }}>
            <div><a href="/game">Game</a></div>
            <div><a href="/submit-word">Submit Word</a></div>
            <div><a href="/bug-report">Bug Report</a></div>
        </div>
    ) : null;
};

export default HamburgerMenu;
