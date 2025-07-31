import React from 'react';

import { Button, DialogActions, DialogContent, TextField } from "@mui/material";
import { useAppDispatch } from '../../../redux/hooks';
import { onCloseDialog } from '../../../redux/features/dialogSlice';
import { api } from '../../../apis/apiClient';
import { onOpenSnackBar } from '../../../redux/features/snackBarSlice';

export function BoardTestCreate() {
    const [ titleValue, setTitleValue ] = React.useState("");
    const [ contentValue, setContentValue ] = React.useState("");
    const dispatch = useAppDispatch();

    const onClickSubmit = async()=> {
        const response = await api.post("/board/insertPost", {
            title : titleValue,
            content : contentValue,
            created_by : 'ADMIN',
            modified_by : 'ADMIN'
        })
        if(response.status === 200) {
            dispatch(onCloseDialog())
            dispatch(onOpenSnackBar({ title : "Success", type : "", content : "Create Update"}))
        } else {
            console.log(response.data)
        } 
    }

    return (
        <>
            <DialogContent dividers>
                <TextField
                    variant='outlined'
                    fullWidth
                    value={titleValue}
                    label='Title'
                    margin='dense'
                    type={'text'}
                    onChange={(e)=>setTitleValue(e.target.value)}
                />
                <TextField 
                    variant='outlined'
                    label="Content"
                    type="text"
                    fullWidth
                    multiline
                    rows={6}
                    value={contentValue}
                    onChange={(e)=> setContentValue(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClickSubmit}>Submit</Button>
                <Button onClick={()=> dispatch(onCloseDialog())}>Cancel</Button>
            </DialogActions>
        </>
    )
};