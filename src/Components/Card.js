import React from 'react';

const Card = (props) => {
    return (
        <section onClick= {props.handleClick} className='card'>
            <p>{props.name}</p>
            <p>{props.price}</p>
        </section>
    )
}

export default Card;