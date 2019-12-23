import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const Card = (props) => {
    return (
        <section onClick= {props.handleClick} className={css(styles.card)}>
            <p>{props.name}</p>
            <p>{props.price}</p>
        </section>
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