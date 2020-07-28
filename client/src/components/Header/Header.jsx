import React from 'react';

const Header = ({ userName }) => {
    return (
        <div className="py-5 text-center">
            <h2>Добро пожаловать, {userName} </h2>
        </div>
    )
}

export default Header;