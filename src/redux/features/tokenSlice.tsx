import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TokenType = {
    accessToken: string
}

const initialState = {
accessToken: ""
} as TokenType;

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    reset: () => initialState,
    token: (state: TokenType, action:PayloadAction<string>) => {
      state.accessToken = action.payload

    },
  },
});

export const {
token,
  reset,
} = tokenSlice.actions;
export default tokenSlice.reducer;