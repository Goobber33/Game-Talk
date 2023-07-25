import React from 'react';

const HamburgerIcon = ({ onClick }) => {
    return (
        <div onClick={onClick} style={{ cursor: 'pointer' }}>
            <div style={{ width: '30px', height: '4px', backgroundColor: 'black', marginBottom: '5px' }} />
            <div style={{ width: '30px', height: '4px', backgroundColor: 'black', marginBottom: '5px' }} />
            <div style={{ width: '30px', height: '4px', backgroundColor: 'black' }} />
        </div>
    );
};

export default HamburgerIcon;
