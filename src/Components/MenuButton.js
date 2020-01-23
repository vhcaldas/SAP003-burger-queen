import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function MenuButton(props) {
    return (
        <button onClick={props.handleClick} id={props.id} className={css(styles.menuButton)}>
            <p>{props.name}</p>
            <p>R${props.price},00</p>
        </button>
    )
}
const styles = StyleSheet.create({
    menuButton: {
        backgroundColor: '#FFB800',
        color: '#0C0804',
        width: '17vw',
        height: 'auto',
        margin: '2vw 1.5vw 1vw 1.5vw',
        fontSize: '0.9rem',
        borderRadius: '2vw',
        fontWeight: 'bold',
        border: 'none',
    }
})

export default MenuButton;
