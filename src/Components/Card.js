import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const Card = (props) => {
    return (
        <div onClick= {props.handleClick} className={css(styles.card)}>
            <p>{props.name}</p>
            <p>{props.price}</p>
        </div>
    )
}

const styles = StyleSheet.create({
    card:{
        textAlign: 'center',
        borderRadius: '2vw',
        border:' 1px solid #FFB800',
        fontSize: '2vw'
    }
})

export default Card;