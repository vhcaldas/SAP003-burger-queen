import React from 'react';

const Card = (props) => {
    return (
        <button placeholder={props.placeholder}
            value={props.state}
            id={props.id}
            onChange={props.handleChange}
            className='card'
        ></button>
    )
}

export default Card;