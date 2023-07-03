import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  loggedInUser: null,
  allowedUsers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.loggedInUser = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.loggedInUser = null;
    },
    setAllowedUsers: (state, action) => {
      state.allowedUsers = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
