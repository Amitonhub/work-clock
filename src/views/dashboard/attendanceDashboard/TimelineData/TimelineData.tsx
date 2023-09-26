import React, { useEffect, useState } from "react";
import styles from "./timelineData.style.module.scss";

//mui imports
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import Typography from "@mui/material/Typography";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import moment from "moment";
import { useAppSelector } from "@/redux/store";
import { AttendanceDataType, Punch } from "../../types/attendanceDataType";
import { AttendanceTypes } from "../../types/attendanceType";
import { ITimelineDataType } from "../../types/timelineDataType";
import { useGetAllAttendanceByIdQuery } from "@/redux/services/attendanceApi";
import { useDispatch } from "react-redux";
import { attendanceData } from "@/redux/features/attendanceSlice";
import Loader from "@/components/Loader/Loader";

function TimelineData() {
  const [timelineData, setTimelinData] = useState<ITimelineDataType>();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.UserData);
  const {
    isLoading: isAttendanceLoading,
    isFetching,
    data,
    error,
    isSuccess,
  } = useGetAllAttendanceByIdQuery(user?.id);
  const userAttendance = useAppSelector(
    (state) => state.attendance.attendanceData
  );
  const currentTime = new Date();
  const today = moment(currentTime).format("L");
  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const hasAttendanceToday = userAttendance?.some(
    (item: AttendanceDataType) => moment(item.date).format("L") === today
  );
  const formattedData = data?.map((item: AttendanceDataType) => ({
    ...item,
    date: new Date(item.date),
  }));

  useEffect(() => {
    if (isSuccess) {
      dispatch(attendanceData(formattedData));
    }
    if (isFetching || isAttendanceLoading) {
      <Loader />;
    }
    if (error) {
      console.log("errror", error);
    }
  }, [isSuccess, error, isFetching, isAttendanceLoading]);

  useEffect(() => {
    if (hasAttendanceToday) {
      const attendanceToday = userAttendance.find(
        (item: AttendanceDataType) => moment(item.date).format("L") === today
      );
      attendanceToday?.punches?.forEach((item: Punch) => {
        if (item.type === AttendanceTypes.punchIn) {
          setTimelinData((prevData) => ({
            ...prevData,
            punchIn: item?.timestamp,
          }));
        }
        if (item.type === AttendanceTypes.mealIn) {
          setTimelinData((prevData) => ({
            ...prevData,
            mealIn: item?.timestamp,
          }));
        }
        if (item.type === AttendanceTypes.teaBreakIn) {
          setTimelinData((prevData) => ({
            ...prevData,
            teaBreakIn: item?.timestamp,
          }));
        }
        if (item.type === AttendanceTypes.punchOut) {
          setTimelinData((prevData) => ({
            ...prevData,
            punchOut: item?.timestamp,
          }));
        }
      });
    }
  }, [userAttendance]);

  return (
    <Timeline position="alternate" className={styles.timelineMainDiv}>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {timelineData?.punchIn
            ? moment.utc(timelineData?.punchIn).format("LT")
            : "---"}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "error.main" }} />
          <TimelineDot color="success" variant="outlined">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Get Started
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>
            Code It
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="text.secondary"
        >
          {timelineData?.mealIn
            ? moment.utc(timelineData?.mealIn).format("LT")
            : "---"}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
          <TimelineDot>
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Meal Time
          </Typography>
          {/* <Typography color="text.secondary" sx={{ fontSize: "14px" }}>
            Take a Break
          </Typography> */}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="text.secondary"
        >
          {timelineData?.teaBreakIn
            ? moment.utc(timelineData?.teaBreakIn).format("LT")
            : "---"}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
          <TimelineDot color="warning">
            <EmojiFoodBeverageIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Tea Time
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "14px" }}>
            ...
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="text.secondary"
        >
          {timelineData?.punchOut
            ? moment.utc(timelineData?.punchOut).format("LT")
            : "---"}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
          <TimelineDot color="error" variant="outlined">
            <CodeOffIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "success.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Get Back Tomorrow
          </Typography>
          {/* <Typography color="text.secondary" sx={{ fontSize: "12px" }}>
            Have a Great Day
          </Typography> */}
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

export default TimelineData;
