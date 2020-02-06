import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

function Button(props) {
    return (
        <button id={props.id} onClick={props.handleClick} className={css(props.class || styles.button)}>
            {props.title}
        </button>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: ' #AE3E12',
        color: '#F4F4F4',
        width: '14vw',
        height: '3vh',
        margin: '1vw 0',
        fontSize: '0.8rem',
        borderRadius: '2vw',
        fontWeight: 'bold',
        border: 'none',
        padding: '1vw',
        
        '@media (min-width: 992px)': {
            height: 'auto',
        }
    }
    
})

export default Button;