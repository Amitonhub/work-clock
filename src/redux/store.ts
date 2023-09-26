import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import notificationSlice from "./features/notificationSlice";
import {TypedUseSelectorHook, useSelector} from "react-redux"
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./services/authApi";
import { attendanceApi } from "./services/attendanceApi";
import tokenSlice from "./features/tokenSlice";
import userSlice from "./features/userSlice";
import attendance from "./features/attendanceSlice";
import { notificationApi } from "./services/notificationApi";
import ThemeToggleSlice from "./features/ThemeToggleSlice";

const reducer = {

    //state slices
    auth: authReducer,
    token: tokenSlice,
    user: userSlice,
    attendance: attendance,
    notifications: notificationSlice,
    theme: ThemeToggleSlice,
    
    // RTK
    [authApi.reducerPath]: authApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer, 
    [notificationApi.reducerPath]: notificationApi.reducer,
}

const reducermiddleware = [
    authApi.middleware,
    attendanceApi.middleware,
    notificationApi.middleware,
]

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    }).concat([
        ...reducermiddleware
    ]),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector