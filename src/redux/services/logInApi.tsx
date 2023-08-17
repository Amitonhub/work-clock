import { LoginForm } from "@/views/LogIn/types";
import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';  // updation in import due to import error from query/react
import { IGenericResponse } from "../types/responseType";
import { BASE_URL } from "@/constants";

export const authApi = createApi({
  reducerPath: "authApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl:   `${BASE_URL}/users`,
    credentials: 'include',
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
  }),
});

export const { useLogInMutation } = authApi;
