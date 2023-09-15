import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Notification {
//   _id: string;
//   user_id: string;
//   message: string;
//   createdAt: string;
//   starred: boolean;
// }

interface Notification {
  id: number;
  message: string;
  createdAt: string;
  starred: boolean;
}

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    fetchNotificationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNotificationsSuccess: (
      state,
      action: PayloadAction<Notification[]>
    ) => {
      state.notifications = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchNotificationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchNotificationsStart,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
} = notificationSlice.actions;

export default notificationSlice.reducer;
