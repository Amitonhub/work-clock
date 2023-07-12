"use client";
import React, { useState } from "react";
import QRCodeGenerator from "./QRCodeGenerator";

function QrCode() {
  const [information, setInformation] = useState("");

  const handleInformationChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInformation(event.target.value);
  };

  return (
    <>
      <div>
        {/* <input
          type="text"
          value={information}
          onChange={handleInformationChange}
        /> */}
        <QRCodeGenerator information={information} />
      </div>
    </>
  );
}

export default QrCode;
