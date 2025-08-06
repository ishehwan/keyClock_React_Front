import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const snackBarSlice = createSlice({
    name : 'snackBarSlice',
    initialState : {
        openYn : false,
        title : "",
        type : "",
        content : ""
    },
    reducers : {
        onOpenSnackBar: (state, action: PayloadAction<{title: string, type: string, content: string}>)=> {
            state.openYn = true;
            state.title = action.payload.title;
            state.type = action.payload.type;
            state.content = action.payload.content;
        },
        onCloseSnackBar: (state) => {
            state.openYn = false;
            state.title = "";
            state.type = "";
            state.content = "";
        }
    }
})

export const { onOpenSnackBar, onCloseSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;