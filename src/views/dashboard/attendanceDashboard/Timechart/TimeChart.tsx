import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import styles from "./TimeChart.module.css";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";

function TimeChart() {
  const [duration, setDuration] = useState("1");

  const handleChange = (event: SelectChangeEvent) => {
    setDuration(event.target.value as string);
  };

  const dropdownOptions = [
    { value: "1", label: "Week" },
    { value: "2", label: "Month" },
    { value: "3", label: "Quaterly" },
  ];

  const getDataForDuration = () => {
    switch (duration) {
      case "1":
        return [
            { name: "Week-1", time: 200 },
            { name: "Week-2", time: 230 },
            { name: "Week-3", time: 210 },
        ];
      case "2":
        return [
          { name: "Month-1", time: 800 },
          { name: "Month-2", time: 600 },
        ];
      case "3":
        return [
          { name: "Q1", time: 1000 },
          { name: "Q2", time: 1200 },
          { name: "Q3", time: 800 },
          { name: "Q4", time: 1100 },
        ];
      default:
        return [];
    }
  };
  const data = getDataForDuration();

  return (
    <div className={styles.timeChartMainDiv}>
      <div className={styles.dropdownMenuDiv}>
        <FormControl variant="standard" fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={duration}
            label="Duration"
            onChange={handleChange}
            color="secondary"
          >
            {dropdownOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={styles.linechartDiv}>
        <LineChart
          width={480}
          height={180}
          data={data}
          margin={{ top: 5, right: 45, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="name" stroke="black" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="time" stroke="#02a4ef" />
        </LineChart>
      </div>
    </div>
  );
}

export default TimeChart;
