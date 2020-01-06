import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function Button (props) {
  return (
      <button onClick={props.handleClick} id={props.id} className={css(styles.button)}>
          {props.title}
      </button>
  )
}
const styles = StyleSheet.create({
  button:{
    backgroundColor: '#0C0804',
    color: '#F4F4F4',
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
