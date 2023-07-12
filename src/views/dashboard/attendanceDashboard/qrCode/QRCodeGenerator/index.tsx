import React from 'react';
import QRCode from 'react-qr-code';
import styles from "./QRCodeGenerator.module.css"

interface QRCodeGeneratorProps{
    information: string
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ information }) => {
  return (
    <div className={styles.qrCodeContainer}>
    <QRCode value={information} className={styles.qrCode} />
    <p className={styles.information}>{information}</p>
  </div>
  );
};

export default QRCodeGenerator;
