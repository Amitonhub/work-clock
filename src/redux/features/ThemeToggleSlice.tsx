import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserType, UserType } from "@/views/dashboard/types/userType";

interface IToggleType{
    darkMode : boolean
}

const initialState:IToggleType = {
    darkMode: false
}

export const theme = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleMode: (state: IToggleType, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload
        },
    },
});

export const {
    toggleMode,
} = theme.actions;
export default theme.reducer;