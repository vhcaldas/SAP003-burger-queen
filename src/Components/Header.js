import React from 'react';

const Header = (props) => {
    return (
        <header className={`header ${scrollStyle} ${shadowStyle}`}>
            <div className='logo'>{props.logo}</div>
            <nav>
                <li className="link-item">home</li>
                <li className="link-item">about</li>
                <li className="link-item">join</li>
            </nav>
        </header>
    )
}

export default Header; 