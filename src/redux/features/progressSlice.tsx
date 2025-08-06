import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from  "@reduxjs/toolkit"

interface ProgressState {
    openYn : boolean;
    message : string;
    location : string | null
}

const initialState: ProgressState = {
    openYn : false,
    message : "",
    location : null
};

export const progressSlice = createSlice({
    name : 'progressSlice',
    initialState,
    reducers : {
        onOpenProgress : (state, action: PayloadAction<{ location : 'global' | 'specify', message? : string }>)=> {
            state.openYn = true;
            state.message = action.payload.message || "Loading...";
            state.location = action.payload.location || 'global';

        },
        
        onCloseProgress : (state)=> {
            state.openYn = false;
            state.message = "";
            state.location = null
        }
    }
})

export const { onOpenProgress, onCloseProgress } = progressSlice.actions;

export default progressSlice.reducer;