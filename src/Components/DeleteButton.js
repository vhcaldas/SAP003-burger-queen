import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { StyleSheet, css } from 'aphrodite';

const DeleteButton = (props) => {
    return (
        <IconButton aria-label="delete"
            className={css(styles.deleteButton)}
            onClick={props.handleClick}>
            <DeleteIcon fontSize="small" />
        </IconButton>
    )
}

const styles = StyleSheet.create({
    deleteButton: {
        color: '#AE3E12',
        width: 'auto',
        height: 'auto',
        padding: '1vw',
        margin: '0',
    },
})

export default DeleteButton;