import React from 'react';

const Order = (props) =>{
    return(
        <div className='order' handle> 
            <p>{props.client}</p> 
            <p>{props.table}</p> 
            <p>{props.order}</p>
            <p>{props.options}</p> 
            <p>{props.dateHour}</p> 
            <p>{props.total}</p> 
        </div>
    )
}

export default Order;