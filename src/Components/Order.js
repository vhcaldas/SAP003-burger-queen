import React from 'react';

const Order = (props) =>{
    return(
        <ol client={props.client} 
            table={props.table} 
            order={props.order} 
            total={props.total} 
            dateHour={props.dateHour} 
        />
    )
}
export default Order;