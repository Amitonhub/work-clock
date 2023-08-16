import { LoginForm } from "@/views/LogIn/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericResponse } from "../types/responseType";
import { BASE_URL } from "@/constants";
import { IUserType } from "@/views/dashboard/types/userType";
import { getAuthToken } from "@/utils/getAuthToken";
import { RootState } from "../store";

export const authApi = createApi({
  reducerPath: "authApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getAuthToken(getState() as RootState)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    logIn: builder.mutation<IGenericResponse, LoginForm>({
      query(data) {
        return {
          url: '/login',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    userInfo: builder.query<IUserType, null>({
      query() {
        return {
          url: '/current',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),

  }),
});

export const { useLogInMutation, useUserInfoQuery } = authApi;
