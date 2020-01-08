import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function MenuButton(props) {
    return (
        <button onClick={props.handleClick} id={props.id} className={css(styles.menuButton)}>
            <p>{props.name}</p>
            <p>{props.price}</p>
        </button>
    )
}
const styles = StyleSheet.create({
    menuButton: {
        backgroundColor: '#FFB800',
        color: '#0C0804',
        width: '15vw',
        height: 'auto',
        margin: '2vw 3vw 1vw 3vw',
        fontSize: '0.5rem',
        borderRadius: '2vw',
        fontWeight: 'bold',
        border: 'none',
    }
})

export default MenuButton;
