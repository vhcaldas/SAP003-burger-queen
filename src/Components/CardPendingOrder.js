import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Button from './Button';

const CardPendingOrder = (props) => {
    return (
        <div key={props.id} className={css(styles.card)}>
            <p className={css(styles.cardItens)}>Status do Pedido: {props.status}</p>
            <p className={css(styles.cardItens)}>Horário: {props.time}</p>
            <p className={css(styles.cardItens)}>Nome do Cliente: {props.name} | Mesa: {props.desk}</p>
            <p className={css(styles.cardItensOrder)}>Pedido:</p>
            {props.order}
            <Button
                title={props.title}
                handleClick={props.changeStatus}
                className= {css(styles.orderButton)}
            />
        </div>
    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        borderRadius: '2vw',
        border: '0.5em solid #FFB800',
        fontSize: '0.7rem',
        margin: '1vw',
        padding: '2vw',
        height: 'auto',
        width: '30vw',
        '@media (min-width: 992px)': {
            fontSize: '0.9rem',
        }
    },
    cardItens: {
        margin: '1vw',
        textAlign: 'center',
        height: '1.125em',
    },
    cardItensOrder: {
        fontWeight: 'bolder',
        margin: '1vw',
        textAlign: 'center',
        padding: '0',
    },

    orderButton:{
        width: '4vw',
        height: '2vh',
    },

})

export default CardPendingOrder;