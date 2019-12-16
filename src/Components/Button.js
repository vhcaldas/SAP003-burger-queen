import React from 'react';

function Button (props) {
  return (
    <button onclick= {props.handleClick} className='Button'>
      {props.title}
    </button>
  )
}

export default Button;
