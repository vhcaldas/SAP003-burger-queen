import React from 'react'
import { StyleSheet, css } from 'aphrodite';
import Order from './Order';

const OrderPad = () => {
    return(
        <div className={css(styles.Command)}>
            <Order/>
        </div>
    )
}

const styles = StyleSheet.create({

})
export default OrderPad;
