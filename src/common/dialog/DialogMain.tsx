import React from 'react';


import { useAppDispatch,useAppSelector } from '../../redux/hooks';
import { Dialog, DialogTitle, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { onCloseDialog } from '../../redux/features/dialogSlice';
import { BoardTestCreate } from './content/BoardTestCreate';
import BoardTestDetail from './content/BoardTestDetail';

export default function DialogMain() {
    const dialogStore = useAppSelector((state)=> state.dialogReducer);

    const dispatch = useAppDispatch();

    const onCloseAction = ()=> {
        dispatch(onCloseDialog())
    }

    const dialogContentSwitcher = ()=> {
        switch(dialogStore.content) {
            case "BoardTestDetail" : 
                return <BoardTestDetail />
            case "BoardTestCreate" : 
                return <BoardTestCreate />
            default : 
            break;
        }
    };

    return (
        <Dialog
            onClose={onCloseAction} 
            open={dialogStore.openYn}
            sx={{
                minWidth : 300,
                '& .MuiDialog-Paper' : {
                    position : 'relative',
                    overflow : 'hidden'
                }
            }}>
            <DialogTitle
                display='flex'
                justifyContent='space-between'
                alignItems='center' 
                sx={{ m : 0, p : 2 }}>
                <Typography fontWeight="Bold">
                    {dialogStore.title}
                </Typography>
                <IconButton 
                    aria-label='close'
                    onClick={onCloseAction}
                    sx={{ color : (theme)=> theme.palette.grey[500]}}>
                    <Close />
                </IconButton>
            </DialogTitle>
            { dialogContentSwitcher() }

        </Dialog>
    )
}