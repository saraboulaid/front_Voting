import React from 'react';
import SearchIcon from './Searchicon';

function NavbarCenterSide() {
    return (
        <div className="center-side">
            <input
                type="text"
                placeholder="Rechercher"
            />
            <SearchIcon />
        </div>
    );
}

export default NavbarCenterSide;
