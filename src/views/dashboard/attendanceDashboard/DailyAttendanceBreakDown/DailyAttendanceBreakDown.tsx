import React from "react";
import styles from "./DailyAttendanceBreakDown.module.css";
import { Table } from "react-bootstrap";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import NoMealsIcon from "@mui/icons-material/NoMeals";
import { Icon } from "@mui/material";

function DailyAttendanceBreakDown() {
  return (
    <>
      <div className={styles.mainDiv}>
        <Table striped="columns" bordered hover responsive="sm" className={styles.attendanceTable} >
          <thead>
            <tr className={styles.attendanceTableTr}>
              <td>Date</td>
              <td>Check In</td>
              <td>Meal In</td>
              <td>Meal Out</td>
              <td>Overtime</td>
              <td>Check Out</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tue 04-07-2023</td>
              <td>
                <Icon
                  component={AccessTimeIcon}
                  fontSize="inherit"
                  color="success"
                  className={styles.icons}
                />
                09:00 AM
              </td>
              
              <td>
                <Icon
                  component={RestaurantIcon}
                  fontSize="inherit"
                  color="warning"
                  className={styles.icons}
                />
                12:00 PM
              </td>
              <td>
                <Icon
                  component={NoMealsIcon}
                  fontSize="inherit"
                  color="warning"
                  className={styles.icons}
                />
                01:00 PM
              </td>
              <td>
                <Icon
                  component={MoreTimeIcon}
                  fontSize="inherit"
                  color="success"
                  className={styles.icons}
                />
                2 hours
              </td>
              <td>
                <Icon
                  component={AccessTimeIcon}
                  fontSize="inherit"
                  color="error"
                  className={styles.icons}
                />
                08:00 PM
              </td>
             
            </tr>
            <tr>
              <td>Wed 05-07-2023</td>
              <td>
                <Icon
                  component={AccessTimeIcon}
                  fontSize="inherit"
                  color="success"
                  className={styles.icons}
                />
                10:00 AM
              </td>
            
              <td>
                <Icon
                  component={RestaurantIcon}
                  fontSize="inherit"
                  color="warning"
                  className={styles.icons}
                />
                01:00 PM
              </td>
              <td>
                <Icon
                  component={NoMealsIcon}
                  fontSize="inherit"
                  color="warning"
                  className={styles.icons}
                />
                02:00 PM
              </td>
              <td>
                <Icon
                  component={MoreTimeIcon}
                  fontSize="inherit"
                  color="success"
                  className={styles.icons}
                />
                1 hours
              </td>
              <td>
                <Icon
                  component={AccessTimeIcon}
                  fontSize="inherit"
                  color="error"
                  className={styles.icons}
                />
                08:00 PM
              </td>
              
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default DailyAttendanceBreakDown;
