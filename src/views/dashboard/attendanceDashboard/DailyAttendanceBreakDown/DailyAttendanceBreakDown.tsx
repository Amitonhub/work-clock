import React, { useState } from "react";
import styles from "./DailyAttendanceBreakDown.module.css";
import { Table } from "react-bootstrap";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import NoMealsIcon from "@mui/icons-material/NoMeals";
import { Icon, Pagination, Stack } from "@mui/material";

function DailyAttendanceBreakDown() {
  const rows = [
    {
      date: "Tue 04-07-2023",
      checkIn: "09:00 AM",
      mealIn: "12:00 PM",
      mealOut: "01:00 PM",
      overtime: "2 hour",
      checkOut: "08:00 PM",
    },
    {
      date: "Wed 05-07-2023",
      checkIn: "10:00 AM",
      mealIn: "01:00 PM",
      mealOut: "02:00 PM",
      overtime: "1 hour",
      checkOut: "08:00 PM",
    },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handleChangePage = (event: any, newPage: number) => {
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
              <td>Overtime</td>
              <td>Check Out</td>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {currentRows.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>
                  <Icon
                    component={AccessTimeIcon}
                    fontSize="inherit"
                    color="success"
                    className={styles.icons}
                  />
                  {row.checkIn}
                </td>
                <td>
                  <Icon
                    component={RestaurantIcon}
                    fontSize="inherit"
                    color="warning"
                    className={styles.icons}
                  />
                  {row.mealIn}
                </td>
                <td>
                  <Icon
                    component={NoMealsIcon}
                    fontSize="inherit"
                    color="warning"
                    className={styles.icons}
                  />
                  {row.mealIn}
                </td>
                <td>
                  <Icon
                    component={MoreTimeIcon}
                    fontSize="inherit"
                    color="success"
                    className={styles.icons}
                  />
                  {row.overtime}
                </td>
                <td>
                  <Icon
                    component={AccessTimeIcon}
                    fontSize="inherit"
                    color="error"
                    className={styles.icons}
                  />
                  {row.checkOut}
                </td>
              </tr>
            ))}
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
