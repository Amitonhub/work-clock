"use client"
import React from 'react'
import styles from"./dashboard.module.css"
import {AttendanceDashBoard} from '@/views/dashboard/attendanceDashboard'
import Divider from '@mui/material/Divider'

const Dashboard = () => {
  return (<>
  <div className={styles.header}>Time & Attendance</div>
  <Divider variant="middle" className={styles.Divider}/>
    {/*  */}
    <AttendanceDashBoard/>
    </>
  )
}

export default Dashboard