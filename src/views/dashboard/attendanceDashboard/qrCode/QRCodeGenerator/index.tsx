import React from 'react';
import QRCode from 'react-qr-code';
import styles from "./QRCodeGenerator.module.css";

interface QRCodeGeneratorProps {
  information: string | Date | number;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ information }) => {

  return (
    <div className={styles.qrCodeContainer}>
      <QRCode value={information} className={styles.qrCode} />
    </div>
  );
};

export default QRCodeGenerator;
