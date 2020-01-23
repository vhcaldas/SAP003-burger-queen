import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Button from './Button';

const CardDelivery = (props) => {
    return (
        <div key={props.id} className={css(styles.card)}>
            <p className={css(styles.cardItens)}> Horário Inicial: {props.time}</p>
            <p className={css(styles.cardItens)}> Horário Final: {props.endTime}</p>
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
        fontSize: '0.8rem',
        margin: '1vw',
        padding: '2vw',
        height: '15vh',
        width: '30vw',
        overflow:'scroll',
        borderRadius: '2vw',
        border: ' 1vw solid #738862',
    },

    cardItens: {
        textAlign: 'center',
        margin: '0.5vw',
    },

    cardItensOrder: {
        fontWeight: 'bolder',
        margin: '1vw',
        textAlign: 'center',
        padding: '0',
    },

    orderButton:{
        backgroundColor: 'green',
    },

    order: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        margin: '0.5vw',
    },
})

export default CardDelivery;