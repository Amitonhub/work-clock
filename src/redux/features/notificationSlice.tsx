import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserNotification {
  id: number;
  user_id: string;
  message: string;
  createdAt: string;
  starred: boolean;
}

export interface IUserNotificationState {
  notifications: IUserNotification[];
  loading: boolean;
  error: string | null;
}

const initialState: IUserNotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notificationsData: (state: IUserNotificationState , action: PayloadAction<IUserNotification[]>) => {
        state.notifications = action.payload
    },
  },
  // reducers: {
  //   fetchNotificationsStart: (state) => {
  //     state.loading = true;
  //     state.error = null;
  //   },
  //   fetchNotificationsSuccess: (
  //     state,
  //     action: PayloadAction<IUserNotification[]>
  //   ) => {
  //     state.notifications = action.payload;
  //     state.loading = false;
  //     state.error = null;
  //   },
  //   fetchNotificationsFailure: (state, action: PayloadAction<string>) => {
  //     state.loading = false;
  //     state.error = action.payload;
  //   },
  // },
});

export const {
  notificationsData
  // fetchNotificationsStart,
  // fetchNotificationsSuccess,
  // fetchNotificationsFailure,
} = notificationSlice.actions;

export default notificationSlice.reducer;
