import React from 'react';

function Button (props) {
    return (
      <button className='Button'>
        {props.title}
      </button>
    )
}

export default Button;
