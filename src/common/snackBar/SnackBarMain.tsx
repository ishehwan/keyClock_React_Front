import React from 'react';

import { IconButton, Snackbar, type SnackbarCloseReason } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { onCloseSnackBar } from '../../redux/features/snackBarSlice';
import { Close } from '@mui/icons-material';

export default function SnackBarMain() {
    const snackBarSlice = useAppSelector((state)=> state.snackBarReducer);
    const dispatch = useAppDispatch();

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason? : SnackbarCloseReason )=> {
        if(reason === 'clickaway') {
            return;
        }
        dispatch(onCloseSnackBar())
    }

    const action = (
        <React.Fragment>
            <IconButton 
                size='small'
                aria-label='close'
                // color=''
                onClick={handleClose}>
                <Close fontSize='small'/>
            </IconButton>
        </React.Fragment>
    )

    return (
        <Snackbar
            title={snackBarSlice.title}
            open={snackBarSlice.openYn}
            autoHideDuration={6000}
            onClose={handleClose}
            message={snackBarSlice.content}
            action={action}>
        </Snackbar>
    )
}