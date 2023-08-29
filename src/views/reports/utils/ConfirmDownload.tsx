import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { CSVLink } from 'react-csv';
import { AttendanceDataType } from '@/views/dashboard/types/attendanceDataType';
import { IUserType, UserType } from '@/views/dashboard/types/userType';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import styles from '../reports.module.scss'

type ConfirmDownloadType = {
  user: IUserType,
  data: AttendanceDataType[],
  open: React.SetStateAction<boolean>
}

export default function ConfirmDownload(props: ConfirmDownloadType) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(props.open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={styles.reportDownload} variant="contained" onClick={handleClickOpen}><FileDownloadIcon />&nbsp; Report in csv </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"You Really want to download .csv file?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            In this file inludes all attendance report related to
            punches and overtime of {`${props?.user?.firstname}-${props?.user?.lastname}`}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <CSVLink className="downloadbtn" filename={`${props?.user?.firstname}-attendance-report.csv`} data={[props.data]}>
            <Button className={styles.downloadButton} variant='contained' onClick={handleClose} autoFocus>
              Download
            </Button>
          </CSVLink>

        </DialogActions>
      </Dialog>
    </div>
  );
}