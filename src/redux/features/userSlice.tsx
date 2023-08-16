import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserType, UserType } from "@/views/dashboard/types/userType";

const initialState = {} as UserType;

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        userData: (state: UserType, action: PayloadAction<IUserType>) => {
            state.UserData = action.payload
        },
    },
});

export const {
    userData,
} = user.actions;
export default user.reducer;