import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Button from './Button'

const Order = (props) =>{

    return(
        <div>
            <ol className={css(styles.order)} 
                name= {props.name}
                price={props.price}
                quantity= {props.quantity}
                options={props.options}  
            />
            <Button
                name='Enviar Pedido'
                onClick={(props) => {props(props)}}
                id={'send-order'} 
            />
        </div>
    )
}

const styles = StyleSheet.create({
    order: {
        backgroundColor: '#FFB800',
        color: '#0C0804',
        width: '10vw',
        height: '20vh',
        margin: '2vw 3vw 1vw 3vw',
        fontSize: '0.5rem',
        borderRadius: '2vw',
        fontWeight: 'bold',
        border: 'none',
    }
})

export default Order;