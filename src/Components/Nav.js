import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from "aphrodite";

const Nav = () => {
    return (
        <nav className={css(styles.navBar)}>
            <ul className={css(styles.navList)}>
                <li className={css(styles.navLink)}>
                    <Link to="/Lounge">Salão</Link>
                </li>
                <li className={css(styles.navLink)}>
                    <Link to="/Kitchen">Cozinha</Link>
                </li>
            </ul>
        </nav>
    )
}

const styles = StyleSheet.create({

    navBar: {
        display: 'inline-flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    navList: {
        listStyleType: 'none',
        margin: '0',
        padding: '0',
        width: '100vw'
    },
    navLink: {
        display: 'inline-flex',
        flexDirection: 'row',
    },
});

export default Nav;