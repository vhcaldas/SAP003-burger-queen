import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function MainMenuButton(props) {
  return (
    <button onClick={props.handleClick} id={props.id} className={css(styles.mainMenu)}>
      {props.title}
    </button>
  )
}
const styles = StyleSheet.create({
  mainMenu: {
    backgroundColor: '#0C0804',
    color: '#F4F4F4',
    width: '20vw',
    height: 'auto',
    marginLeft: '1vw',
    fontSize: '0.9rem',
    borderRadius: '2vw',
    fontWeight: 'bold',
    border: 'none',
    padding: '1vw',
  }
})

export default MainMenuButton;
