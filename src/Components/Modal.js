import React from 'react';


const Modal = (props) => {

    return (
        <div>
            <h3>{props.call}</h3>
            <input checked={props} 
                onChange={props.handleClick} 
                type={props.type} 
                name={props.name} 
                value={props.value} />
            <label>{props.label}</label>
        </div>
    )

}

export default Modal