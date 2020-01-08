import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function Button(props) {
    return (
        <button onClick={(props) => props.click(props)} id={props.id} className={css(styles.button)}>
            {props.name}
            
        </button>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: ' #AE3E12',
        color: '#BBA250',
        width: '4vw',
        height: '3vh',
        margin: '2vw 3vw 1vw 3vw',
        fontSize: '0.4rem',
        borderRadius: '2vw',
        fontWeight: 'bold',
        border: 'none',
    }
})

export default Button;