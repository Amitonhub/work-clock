import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import {TypedUseSelectorHook, useSelector} from "react-redux"
import { authApi } from "./services/logInApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const reducer = {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer
}

const reducermiddleware = [
    authApi.middleware,
]

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        ...reducermiddleware
    ]),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector