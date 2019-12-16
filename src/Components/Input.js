import React from 'react';

const Input = () => {
    return (
        <input placeholder={props.placeholder} value={props.state} id = {props.id} onChange ={props.handleChange} className='input'>

        </input> 
    )
    
}

exports module Input