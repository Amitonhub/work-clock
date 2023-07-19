"use client";
import React, { useState } from "react";
import QRCodeGenerator from "./QRCodeGenerator";

function QrCode() {
  const webUrl = " "
  const [information, setInformation] = useState((webUrl));

  const handleInformationChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInformation(event.target.value);
  };

  return (
    <>
      <div>
        <input 
          type="http://localhost:3000/dashboard"
          value={information}
          onChange={handleInformationChange}
        />
        <QRCodeGenerator information={information} />
      </div>
    </>
  );
}

export default QrCode;
