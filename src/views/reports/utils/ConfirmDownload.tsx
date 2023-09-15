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
import { IUserType } from '@/views/dashboard/types/userType';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import styles from '../reports.module.scss'
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

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

  const handlePdfDownload = async () => {
    const firstName = props.user?.firstname || "";
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;

    const tableWidth = page.getWidth() - 100;
    const tableHeight = page.getHeight() - 100;
    const tableX = 50;
    const tableY = page.getHeight() - 50;

    // Draw table headers
    const headers = ["Date", "_id", "User ID", "Punches"];
    const headerHeight = 20;
    const headerRowY = tableY - headerHeight;
    const headerCellWidth = tableWidth / headers.length;

    page.setFont(font);
    page.setFontSize(fontSize);

    headers.forEach((header, index) => {
      const headerCellX = tableX + index * headerCellWidth;

      page.drawText(header, {
        x: headerCellX,
        y: headerRowY,
        size: fontSize,
        font: font,
        color: rgb(0.8, 0.8, 0.8),
        maxWidth: headerCellWidth,
        // wrap: true,
      });
    });

    // Draw data rows
    const dataRowHeight = 20;
    const dataCellWidth = tableWidth / headers.length;

    props.data.forEach((attendance: AttendanceDataType, rowIndex: number) => {
      const dataRowY = headerRowY - (rowIndex + 1) * dataRowHeight;

      headers.forEach((header, columnIndex) => {
        const dataCellX = tableX + columnIndex * dataCellWidth;

        // page.drawText(attendance[header], {
        //   x: dataCellX,
        //   y: dataRowY,
        //   size: fontSize,
        //   font: font,
        //   maxWidth: dataCellWidth,
        // });
      });
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${firstName}-attendance-report.pdf`;
    link.click();
  };
  return (
    <div>
      <Button className={styles.reportDownload} variant="contained" onClick={handleClickOpen}><FileDownloadIcon />&nbsp;Report in csv / pdf </Button>
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
          <CSVLink className="downloadbtn" filename={`${props?.user?.firstname}-attendance-report.csv`} data={props.data}>
            <Button className={styles.downloadButton} variant='contained' onClick={handleClose} autoFocus>
              .csv
            </Button>
          </CSVLink>
          <Button
            className={styles.downloadButton}
            variant="contained"
            onClick={handlePdfDownload}
          >
            <FileDownloadIcon /> .pdf
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}