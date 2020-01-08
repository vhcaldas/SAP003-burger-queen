import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function Button(props) {
    return (
        <button onClick={props.handleClick} id={props.id} className={css(styles.button)}>
            <p>{props.name}</p>
            <p>R${props.price}</p>
        </button>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFB800',
        color: '#0C0804',
        width: '3vw',
        height: 'auto',
        margin: '2vw 3vw 1vw 3vw',
        fontSize: '0.4rem',
        borderRadius: '2vw',
        fontWeight: 'bold',
        border: 'none',
    }
})

export default Button;