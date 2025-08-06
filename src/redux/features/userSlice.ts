import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  username: string;
  givenName: string;
  familyName: string;
  email: string;
  role: string;
}

const initialState: UserState = {
  name: "",
  username: "",
  givenName: "",
  familyName: "",
  email: "",
  role: ""
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.givenName = action.payload.givenName;
      state.familyName = action.payload.familyName;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    clearUserInfo: (state) => {
      state.name = "";
      state.username = "";
      state.givenName = "";
      state.familyName = "";
      state.email = "";
      state.role = "";
    }
  }
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
