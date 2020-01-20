import React from 'react';
import { StyleSheet, css } from 'aphrodite';


const CardDoneOrder = (props) => {
    return (
        <div key={props.id} className={css(styles.card)}>
            <p className={css(styles.cardItens)}> Horário Inicial: {props.time}</p>
            <p className={css(styles.cardItens)}> Horário Final: {props.endTime}</p>
            <p className={css(styles.cardItens)}>Nome do Cliente: {props.name} | Mesa: {props.desk}</p>
            <p className={css(styles.cardItensOrder)}>Pedido:</p>
            {props.order}
        </div>
    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        borderRadius: '2vw',
        border: ' 1vw solid #738862',
        fontSize: '0.8rem',
        margin: '1vw',
        padding: '2vw',
        height: '20vh',
        width: '30vw',
        overflow:'scroll',
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
})

export default CardDoneOrder;