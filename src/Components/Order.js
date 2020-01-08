import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import DeleteButton from './DeleteButton'

const Order = (props) =>{

    return(
        <div className={css(styles.order)}>
            <ol className={css(styles.orderList)}>
                <ul className={css(styles.listName)}>Quantidade: {props.quantity}</ul>
                <ul className={css(styles.listName)}>Nome: {props.name}</ul>
                <ul className={css(styles.listName)}>Preço: R$ {props.price},00</ul>
            </ol>
            <div><DeleteButton/></div>
        </div>
    )
}

const styles = StyleSheet.create({
    order:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderList: {
        color: '#0C0804',
        width: 'auto',
        height: 'auto',
        fontSize: '0.8rem',
        padding: '1vw'
    },
    listName:{
        padding: '0'
    }
})

export default Order;