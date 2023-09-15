import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/constants";
import { getAuthToken } from "@/utils/getAuthToken";
import { RootState } from "../store";
import { handlingErrorResponse } from "../utils/handlingErrorResponse";
import { IUserNotification } from "../features/notificationSlice";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/notifications`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getAuthToken(getState() as RootState);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),  
  tagTypes: ["notifications"],
  endpoints: (builder) => ({
    fetchNotifications: builder.query<IUserNotification[], void>({
      query() {
        return {
          url: `/getall`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      transformErrorResponse: handlingErrorResponse,
      providesTags: ["notifications"],
    }),
    createNotification: builder.mutation<IUserNotification, Partial<IUserNotification>>({
      query(notification) {
        return {
          url: "/create",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: notification,
        };
      },
      transformErrorResponse: handlingErrorResponse,
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const { useFetchNotificationsQuery, useCreateNotificationMutation } = notificationApi;


