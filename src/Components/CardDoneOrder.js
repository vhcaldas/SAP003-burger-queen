import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';



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
        fontSize: '0.7rem',
        margin: '1vw',
        padding: '2vw',
        height: 'auto',
        width: '30vw',
        borderRadius: '2vw',
        border: '0.5em solid #738862',
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