import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function Button(props) {
    return (
        <button id={props.id} onClick={props.handleClick} className={css(styles.button)}>
            {props.title}
        </button>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: ' #AE3E12',
        color: '#F4F4F4',
        width: '18vw',
        height: '4vh',
        margin: '1vw 0',
        fontSize: '1rem',
        borderRadius: '2vw',
        fontWeight: 'bold',
        border: 'none',
    }
})

export default Button;