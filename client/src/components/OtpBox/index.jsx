import { useRef, useState } from "react";

// Row of single-digit boxes. Supports typing, backspace and pasting a whole code.
const OtpBox = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const refs = useRef([]);

  const commit = (next) => {
    setOtp(next);
    onChange(next.join(""));
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // digits only
    const next = [...otp];
    next[index] = value;
    commit(next);
    if (value && index < length - 1) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) refs.current[index - 1]?.focus();
  };

  const handlePaste = (e) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!digits) return;
    e.preventDefault();
    const next = new Array(length).fill("");
    digits.split("").forEach((d, i) => (next[i] = d));
    commit(next);
    refs.current[Math.min(digits.length, length - 1)]?.focus();
  };

  return (
    <div style={{ display: "flex", gap: "6px", justifyContent: "center" }} className="otpBox">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (refs.current[index] = el)}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-[42px] h-[45px] text-center text-[17px] border border-[rgba(0,0,0,0.3)] rounded-md focus:outline-none focus:border-[#ff5252]"
        />
      ))}
    </div>
  );
};
export default OtpBox;
