import React, { useEffect, useState } from "react";
import styles from "./reportsTable.module.scss";
import { Table } from "react-bootstrap";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import NoMealsIcon from "@mui/icons-material/NoMeals";
import { Button, Icon, Pagination, Stack } from "@mui/material";
import { useGetAllAttendanceByIdQuery } from "@/redux/services/attendanceApi";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { attendanceData } from "@/redux/features/attendanceSlice";
import moment from "moment";
import { AttendanceDataType } from "@/views/dashboard/types/attendanceDataType";
import { useUserInfoQuery } from "@/redux/services/authApi";
import Loader from "@/components/Loader/Loader";
import { IUserType } from "@/views/dashboard/types/userType";
import { userData } from "@/redux/features/userSlice";

function DailyAttendanceBreakDown() {
  const user = useAppSelector((state) => state.user.UserData)
  const { isLoading: isUserInfoLoading, isFetching: isUserFetching, data: isUserData, error: userError, isSuccess: userSuccess } = useUserInfoQuery(null);
  const { isLoading: isAttendanceLoading, isFetching, data, error, isSuccess } = useGetAllAttendanceByIdQuery(user?.id);
  const dispatch = useDispatch()
  const userAttendance = useAppSelector((state) => state.attendance.attendanceData)
  const formattedData = data?.map((item: AttendanceDataType) => ({
    ...item,
    date: new Date(item.date),
  }));

  useEffect(() => {
    if (userSuccess) {
      dispatch(userData(isUserData as IUserType))

    }
    if (isFetching || isUserFetching || isUserInfoLoading || isAttendanceLoading) {
      <Loader />
    }
    if (error) {
      console.log('errror', error)
    }
    console.log(isUserData)
  }, [data, isUserData, dispatch])

  useEffect(() => {
    if (isSuccess) {
      dispatch(attendanceData(formattedData));
    }
    if (error) {
      console.log('errror', error)
    }
  }, [attendanceData, isSuccess, isUserData, error])

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = userAttendance?.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(userAttendance?.length / rowsPerPage);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    event.preventDefault();
    setPage(newPage);
  };

  return (
    <>
      <div className={styles.mainDiv}>
        <Table
          striped="columns"
          bordered
          hover
          responsive="sm"
          className={styles.attendanceTable}
        >
          <thead className={styles.tableHead}>
            <tr className={styles.attendanceTableTr}>
              <td>Date</td>
              <td>Check In</td>
              <td>Meal In</td>
              <td>Meal Out</td>
              <td>Tea Break In</td>
              <td>Tea Break Out</td>
              <td>Check Out</td>
              <td>Overtime</td>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {currentRows
              ? [...(currentRows.toReversed().map((item: AttendanceDataType) => (
                <tr key={item._id}>
                  <td>{moment.utc(item.date).format('L')}</td>
                  <td>
                    <Icon
                      component={AccessTimeIcon}
                      fontSize="inherit"
                      color="success"
                      className={styles.icons}
                    />
                    {item.punches.map((item) => {
                      if (item.type === "punch-in") {
                        return (
                          <React.Fragment>
                            {moment.utc(item.timestamp).format('h:mm a')}
                          </React.Fragment>
                        );
                      }
                    })}
                  </td>
                  <td>
                    <Icon
                      component={RestaurantIcon}
                      fontSize="inherit"
                      color="warning"
                      className={styles.icons}
                    />
                    {item.punches.map((item) => {
                      if (item.type === "meal-in") {
                        return (
                          <React.Fragment>
                            {moment.utc(item.timestamp).format('LT')}
                          </React.Fragment>
                        );
                      }
                    })}
                  </td>
                  <td>
                    <Icon
                      component={NoMealsIcon}
                      fontSize="inherit"
                      color="warning"
                      className={styles.icons}
                    />
                    {item.punches.map((item) => {
                      if (item.type === "meal-out") {
                        return (
                          <React.Fragment>
                            {moment.utc(item.timestamp).format('h:mm a')}
                          </React.Fragment>
                        );
                      }
                    })}
                  </td>
                  <td>
                    <Icon
                      component={NoMealsIcon}
                      fontSize="inherit"
                      color="warning"
                      className={styles.icons}
                    />
                    {item.punches.map((item) => {
                      if (item.type === "tea-break-in") {
                        return (
                          <React.Fragment>
                            {moment.utc(item.timestamp).format('h:mm a')}
                          </React.Fragment>
                        );
                      }
                    })}
                  </td>
                  <td>
                    <Icon
                      component={NoMealsIcon}
                      fontSize="inherit"
                      color="warning"
                      className={styles.icons}
                    />
                    {item.punches.map((item) => {
                      if (item.type === "tea-break-out") {
                        return (
                          <React.Fragment>
                            {moment.utc(item.timestamp).format('h:mm a')}
                          </React.Fragment>
                        );
                      }
                    })}
                  </td>
                  <td>
                    <Icon
                      component={AccessTimeIcon}
                      fontSize="inherit"
                      color="error"
                      className={styles.icons}
                    />
                    {item.punches.map((item) => {
                      if (item.type === "punch-out") {
                        return (
                          <React.Fragment>
                            {moment.utc(item.timestamp).format('h:mm a')}
                          </React.Fragment>
                        );
                      }
                    })}
                  </td>
                  <td>
                    <Icon
                      component={MoreTimeIcon}
                      fontSize="inherit"
                      color="success"
                      className={styles.icons}
                    />
                    {item.punches.map((item) => {
                      if (item.type === "overtime") {
                        return (
                          <React.Fragment>
                            {moment.utc(item.timestamp).format('h:mm a')}
                          </React.Fragment>
                        );
                      }
                    })}
                  </td>
                </tr>
              )))] : []}
          </tbody>
        </Table>
        <Stack
          spacing={2}
          justifyContent="flex-end"
          alignItems="end"
          className={styles.pagination}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            color="standard"
          />
        </Stack>
      </div>
    </>
  );
}

export default DailyAttendanceBreakDown;
