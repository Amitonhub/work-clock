import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttendanceDataType, IAttendanceType } from "@/views/dashboard/types/attendanceDataType";

const initialState = {} as IAttendanceType;

export const attendance = createSlice({
    name: "attendance",
    initialState,
    reducers: {
        attendanceData: (state: IAttendanceType, action: PayloadAction<AttendanceDataType>) => {
            state.attendanceData = action.payload
        },
    },
});

export const {
    attendanceData,
} = attendance.actions;
export default attendance.reducer;