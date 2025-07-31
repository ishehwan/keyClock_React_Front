import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export const dialogSlice = createSlice({
    name : 'dialogSlice',
    initialState : {
        openYn : false,
        title: "",
        content : "",
        data : [] as Board[]
    },
    reducers : {
        onCloseDialog: (state)=> {
            state.openYn = false;
            state.title = "";
            state.content = "";
            state.data = [];
        },
        onOpenDialog : (state, action: PayloadAction<{title: string, content : string, data : Board[]}>)=> {
            state.openYn = true
            state.title = action.payload.title;
            state.content = action.payload.content;
            state.data = action.payload.data;
        } 
    }
})

export const { onCloseDialog, onOpenDialog } = dialogSlice.actions;

export default dialogSlice.reducer;