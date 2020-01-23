import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from "aphrodite";

const Nav = () => {
    return (
        <nav className={css(styles.navBar)}>
            <ul className={css(styles.navList)}>
                <li className={css(styles.navLink)}>
                    <Link to="/Lounge" className={css(styles.navName)} >Salão</Link>
                </li>
                <li className={css(styles.navLink)}>
                    <Link to="/Kitchen" className={css(styles.navName)}>Cozinha</Link>
                </li>
                <li className={css(styles.navLink)}>
                    <Link to="/Delivery" className={css(styles.navName)}>Entrega</Link>
                </li>
            </ul>
        </nav>
    )
}

const styles = StyleSheet.create({

    navList: {
        listStyleType: 'none',
        margin: '0 0 2vw',
        padding: '0',
        width: '100vw',
        textAlign: 'center',
        display: 'inline-flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',

    },

    navLink: {
        display: 'inline-flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    navName: {
        textDecoration: 'none',
        color: '#0C0804',
        fontFamily: ['Montserrat', 'sans-serif'],
        src: "url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap')",
        fontSize: '1.5rem',
        borderStyle: 'dotted',
        borderRadius: '2vw',
        borderColor: '#FFB800',
        padding: '2vw'

    },
});

export default Nav;