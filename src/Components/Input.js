import React from 'react';

const Input = (props) => {
    return (
        <input 
            placeholder={props.placeholder} 
            className='input'
            type={props.type}
            value={props.value}
            onChange={props.handleChange}
        >
        </input> 
    )
}

export default Input;