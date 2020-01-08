import React from 'react';

const Order = (props) =>{

    return(
        <div>
            <ol className='order' 
                name= {props.name}
                price={props.price}
                quantity= {props.quantity}
                options={props.options}  
            />
        </div>
    )
}

export default Order;