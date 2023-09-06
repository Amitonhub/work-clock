export interface AttendanceDataType {
    _id: string
    user_id: string
    date: Date
    punches: Punch[]
    __v: number
}

export interface Punch {
    type: string
    timestamp: string
    _id: string
}

export interface IAttendanceType {
    attendanceData: any
}