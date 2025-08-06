import React from 'react';

import { Button, DialogActions, DialogContent, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { api } from '../../../apis/apiClient';
import { onOpenSnackBar } from '../../../redux/features/snackBarSlice';
import { onCloseProgress, onOpenProgress } from '../../../redux/features/progressSlice';

export default function BoardTestDetail() {
    const [ editable, setEditable ] = React.useState(false)
    const [ boardData, setBoardData ] = React.useState<Board>();
    const selBoardData = useAppSelector((state)=> state.dialogReducer).data[0] as Board;
    const dispatch = useAppDispatch();

    React.useEffect(()=> {
        setBoardData(selBoardData)
    },[])

    const onClickButton = async(type : "Edit" | "Cancel" | "Save")=> {
        switch(type) {
            case "Edit" :
                dispatch(onOpenProgress({ location: 'specify', message : "Loading..."}))
                await new Promise(resolve => setTimeout(resolve, 2000))
                setEditable(true) 
                dispatch(onCloseProgress())
            break;
            case "Cancel" : 
                setEditable(false)
                setBoardData(selBoardData);
            break;
            case "Save" : {
                const response = await api.post("/board/updatePost", boardData);
                if(response.status === 200) {
                    dispatch(onOpenSnackBar({ title : "Success", type : "", content : "Create Update"}))
                } else {
                    dispatch(onOpenSnackBar({ title : "Error", type : "error", content : "Create Update Failed"}))
                }
            }
            break;
            default :
            break;
        }
    }

    const onChangeBoard = (name : string, value : string)=> {
        if(boardData) {
            setBoardData({
                ...boardData,
                [name] : value
            })
        }
    }

    return (
        <>
            <DialogContent dividers>
                <TextField
                    variant="outlined"
                    fullWidth
                    disabled
                    margin='dense'
                    label="ID"
                    value={boardData?.id ?? ""} 
                />
                <TextField 
                    variant='outlined'
                    fullWidth
                    margin='dense'
                    disabled={!editable}
                    label="Title"
                    type="text"
                    onChange={(e)=>onChangeBoard("title", e.target.value)}
                    value={boardData?.title ?? ""} 
                />
                <TextField 
                    variant='outlined'
                    fullWidth
                    margin='dense'
                    disabled={!editable}
                    rows={6}
                    multiline
                    label="Content"
                    type="text"
                    onChange={(e)=> onChangeBoard("content", e.target.value)}
                    value={boardData?.content ?? ""} 
                />
            </DialogContent>
            {editable 
                ? <DialogActions>
                    <Button onClick={()=>onClickButton("Save")}>Save</Button>
                    <Button onClick={()=>onClickButton("Cancel")}>Cancel</Button>
                </DialogActions> 
                : <DialogActions>
                    <Button onClick={()=>onClickButton("Edit")}>Edit</Button>
                </DialogActions>
            }
        </>
    )
}