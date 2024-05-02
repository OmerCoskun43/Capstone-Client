import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.user = action.payload.data;
      state.token = action.payload.token;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
    },
    updateSuccess: (state, action) => {
      state.user = action.payload.data;
    },
    deleteSuccess: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {
  registerSuccess,
  loginSuccess,
  logoutSuccess,
  updateSuccess,
  deleteSuccess,
} = authSlice.actions;
export default authSlice.reducer;
