import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserType, UserType } from "@/views/dashboard/types/userType";

interface IToggleType{
    darkMode : boolean
}

const initialState:IToggleType = {
    darkMode: localStorage.getItem("darkMode") === "true",
}

export const theme = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleMode: (state: IToggleType, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload
            localStorage.setItem("darkMode", action.payload.toString())
        },
    },
});

export const {
    toggleMode,
} = theme.actions;
export default theme.reducer;
