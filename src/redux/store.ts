// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { dialogSlice } from "./features/dialogSlice";
import { snackBarSlice } from "./features/snackBarSlice";
import { userSlice } from "./features/userSlice";
import { progressSlice } from "./features/progressSlice";


export const store = configureStore({
  reducer: {
    dialogReducer : dialogSlice.reducer,
    snackBarReducer : snackBarSlice.reducer,
    progressReducer : progressSlice.reducer,
    userReducer : userSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
