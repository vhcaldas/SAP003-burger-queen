import React from 'react';
import Logo from './Header.png';
import { StyleSheet, css } from 'aphrodite';

const Header = () => {
    return (
        <header className={css(styles.header)}>
            <img src={Logo} className={css(styles.image)} alt="Logo App" />
        </header>
    )
}

const styles = StyleSheet.create({
    header: {
        height: '15vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '@media (min-width: 992px)': {
            height: '60vh',
        }
    },

    image: {
        height: '100%',
        maxWidth: '100%'
    },
})

export default Header; 