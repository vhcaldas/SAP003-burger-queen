import React from 'react';
import Logo from './Header.png';

const Header = () => {
    return (
        <header className='header'>
            <img src = {Logo} alt="Logo App"/>
            <nav>
                <li className="link-item">home</li>
                <li className="link-item">about</li>
                <li className="link-item">join</li>
            </nav>
        </header>
    )
}

export default Header; 