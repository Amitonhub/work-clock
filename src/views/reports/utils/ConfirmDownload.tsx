import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { AttendanceDataType } from "@/views/dashboard/types/attendanceDataType";
import { IUserType } from "@/views/dashboard/types/userType";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import styles from "../reports.module.scss";
import CsvDownloader from "react-csv-downloader";
import moment from "moment";

type ConfirmDownloadType = {
  user: IUserType;
  data: AttendanceDataType[];
  open: React.SetStateAction<boolean>;
};

export default function ConfirmDownload(props: ConfirmDownloadType) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const columns = [
    {
      id: "date",
      displayName: "Date",
    },
    {
      id: "day",
      displayName: "Day",
    },
    {
      id: "punch in",
      displayName: "Punch-In",
    },
    {
      id: "meal in",
      displayName: "Meal-In",
    },
    {
      id: "meal out",
      displayName: "Meal-Out",
    },
    {
      id: "tea break in",
      displayName: "Tea-Break-In",
    },
    {
      id: "tea break out",
      displayName: "Tea-Break-Out",
    },
    {
      id: "punch out",
      displayName: "Punch-Out",
    },
    {
      id: "Overtime",
      displayName: "Overtime",
    },
  ];

  const handleClickOpen = () => {
    setOpen(props.open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className={styles.reportDownload}
        variant="contained"
        onClick={handleClickOpen}
      >
        <FileDownloadIcon />
        &nbsp;Report in csv{" "}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"You Really want to download file?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            In this file includes all attendance report related to punches and
            overtime of {`${props?.user?.firstname}-${props?.user?.lastname}`}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <CsvDownloader
            text="Download CSV"
            columns={columns}
            datas={props?.data?.map((attendance) => [
              moment(attendance.date).format("MMM Do YY"),
              moment(attendance.date).format("dddd"),
              attendance.punches
                .map((punch) => moment.utc(punch.timestamp).format("h:mm a"))
                .join(", "),
            ])}
            filename={`${props?.user?.firstname}-${props?.user?.lastname}-attendance-report.csv`}
            extension=".csv"
            separator=","
          >
            <Button
              className={styles.downloadButton}
              variant="contained"
              onClick={handleClose}
            >
              Download
            </Button>
          </CsvDownloader>
        </DialogActions>
      </Dialog>
    </div>
  );
}
