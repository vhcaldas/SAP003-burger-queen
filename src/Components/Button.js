import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function Button (props) {
  return (
      <button onClick= {props.handleClick} className={css(styles.button)}>
          {props.title}
      </button>
  )
}
const styles = StyleSheet.create({
  button:{
    backgroundColor: '#e0245c',
    color: '#dce3f3',
    width: '25vw',
    height: '10vh',
    margin: '2vw 3vw 1vw 3vw',
    fontSize: '1rem',
    borderRadius: '2vw',
    fontWeight: 'bold',
    border: 'none',
  }
})

export default Button;
