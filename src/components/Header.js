import React from 'react';
import headerLogo from '../images/logo.svg';

function Header() {

    return (
        <header className="header">
            <img alt='лого' src={headerLogo} className="header__logo" />
        </header>
    );
}

export default Header;