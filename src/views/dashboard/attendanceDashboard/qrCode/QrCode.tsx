"use client";
import React, { useState, useEffect } from "react";
import QRCodeGenerator from "./QRCodeGenerator";

function QrCode() {
  const [information, setInformation] = useState(() => new Date().toString());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date().toString();
      setInformation(currentDate);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <QRCodeGenerator information={information} />
      </div>
    </>
  );
}

export default QrCode;
