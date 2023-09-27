import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserType, UserType } from "@/views/dashboard/types/userType";

interface IToggleType {
  darkMode: boolean;
}

const getInitialDarkMode = (): boolean => {
  if (typeof window !== "undefined") {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode === "true";
  }
  return false;
};

const initialState: IToggleType = {
  darkMode: getInitialDarkMode(),
};

export const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode: (state: IToggleType, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", action.payload.toString());
      }
    },
  },
});

export const { toggleMode } = theme.actions;
export default theme.reducer;