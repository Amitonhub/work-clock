import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericResponse } from "../types/responseType";
import { BASE_URL } from "@/constants";
import { getAuthToken } from "@/utils/getAuthToken";
import { RootState } from "../store";
import { handlingErrorResponse } from "../utils/handlingErrorResponse";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/attendance`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getAuthToken(getState() as RootState)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['attendance'],
  endpoints: (builder) => ({
    attendance: builder.mutation<IGenericResponse, string>({
      query(data) {
        return {
          url: '',
          method: 'POST',
          body: {punchType: data},
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      transformErrorResponse: handlingErrorResponse,
      invalidatesTags: [{ type: 'attendance', id: 'attendance' }],
    }),
    getAllAttendanceById: builder.query<any, string>({
      query(userId) {
        return {
          url: `/${userId}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      transformErrorResponse: handlingErrorResponse,
      providesTags: [{ type: 'attendance', id: 'attendance' }],
    }),
    getAllAttendanceByPeriod: builder.mutation<void, { user_id: string, from_date: string, to_date: string }>({
      query({ user_id, from_date, to_date }) {
        return {
          url: `/period-attendance`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: { from_date , to_date, user_id },
        };
      },
      transformErrorResponse: handlingErrorResponse,
      invalidatesTags: [{ type: 'attendance', id: 'attendance' }],
    }),
  }),
});

export const { useAttendanceMutation, useGetAllAttendanceByIdQuery, useGetAllAttendanceByPeriodMutation } = attendanceApi;
