import React, { useState } from 'react';
import headerLogo from '../images/logo.svg';
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";

function Header({ onSignOut, email }) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(!isMenuOpen);
    }

    const isMain = useRouteMatch({ path: "/", exact: true });

    return (
        <header
            className={`header 
         ${isMenuOpen ? "header_menu-open" : ""} 
         ${isMain ? "header_page-main" : ""}`}
        >
            <img
                src={headerLogo}
                alt='Лого'
                className='header__logo'
            />
            <Switch>
                <Route exact path='/'>
                    <button
                        className='header__burger'
                        type='button'
                        aria-label='меню'
                        onClick={toggleMenu}
                    ></button>
                    <div className='header__wrapper'>
                        <p className='header__user'>{email}</p>
                        <button className='header__logout' onClick={onSignOut}>
                            Выйти
                        </button>
                    </div>
                </Route>
                <Route path='/signup'>
                    <Link className='header__link' to='signin'>
                        Войти
                    </Link>
                </Route>
                <Route path='/signin'>
                    <Link className='header__link' to='signup'>
                        Регистрация
                    </Link>
                </Route>
            </Switch>
        </header>
    );
}

export default Header;