// import { Button } from "@mui/material";
// import React, { useState } from "react";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
// const OtyBox = () => {
//   const [qytValue, setQytValue] = useState(1);
//   const plusQyt = () => {
//     setQytValue(qytValue + 1);
//   };
//   const minusQyt = () => {
//     if (qytValue === 1) {
//       setQytValue(1);
//     } else {
//       setQytValue(qytValue - 1);
//     }
//   };
//   return (
//     <div className="qtyBox flex items-center relative">
//       <input
//         type="number"
//         value={qytValue}
//         className="w-full  h-[40px] p-2 pl-5 text-[15px] focus:outline-none border border-[rgba(0,0,0,0.2)] rounded-md"
//       />
//       <div className="flex items-center flex-col justify-between h-[40px] absolute top-0 right-0 z-50 border-[#000] border-l-[1px]">
//         <Button
//           className="!min-w-[30px] !w-[30px] !h-[20px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]"
//           onClick={plusQyt}
//         >
//           <FaAngleUp className="text-[12px] opacity-55" />
//         </Button>
//         <Button
//           className="!min-w-[30px] !w-[30px] !h-[20px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]"
//           onClick={minusQyt}
//         >
//           <FaAngleDown className="text-[12px] opacity-55 " />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default OtyBox;

import { useState } from "react";

const OtpBox = ({ length, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return; //only numbers are allowed

    //update OTP value
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    //focus on next input

    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handlekeyDown = (event, index) => {
    if (event.key === "Backspace" && otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus();
    }
  };

  return (
    <div
      style={{ display: "flex", gap: "5px", justifyContent: "center" }}
      className="otpBox"
    >
      {otp.map((data, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handlekeyDown(e, index)}
          className="w-[45px] h-[45px] text-center text-[17px]"
        />
      ))}   
    </div>
  );
};
export default OtpBox;
