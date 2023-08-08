import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LogIn } from "../types/authType";
import { LoginForm } from "@/views/LogIn/types";

const initialState = {
  isLogin: false,
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
} as LogIn;

export const auth = createSlice({
  name: "counter",
  initialState,
  reducers: {
    reset: () => initialState,
    logOut: (state) => {
      return initialState;
    },
    logIn: (state: LogIn, action:PayloadAction<LoginForm>) => {
      state.isLogin = true,
      state.userInfo = action.payload,
      state.success = true,
      state.error = null,
      state.loading = false

    },
  },
});

export const {
logIn,
  reset,
} = auth.actions;
export default auth.reducer;