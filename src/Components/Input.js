import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const Input = (props) => {
    return (
        <input 
            placeholder={props.placeholder} 
            className={css(styles.input)}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            min={props.min}
        >
        </input> 
    )
}

const styles = StyleSheet.create({

    input:{
        borderRadius: '2vw',
        borderColor: '#FFB800',
        width: '25vw',
        height: '2vh',
        margin: '0vw 3vw 1vw 3vw',
        padding: '1vw'
    }

})

export default Input;