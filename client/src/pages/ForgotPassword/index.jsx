import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpBox from "../../components/OtpBox";
import { MyContest } from "../../App";
import api from "../../api";

// Three steps on one page: 1) email  2) code from email  3) new password
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(MyContest);

  const run = async (fn) => {
    setLoading(true);
    try {
      await fn();
    } catch (err) {
      context.openAlertBox("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendCode = (e) => {
    e.preventDefault();
    if (!email.trim()) return context.openAlertBox("error", "Enter your email");
    run(async () => {
      await api.post("/users/forgot-password", { email });
      context.openAlertBox("success", "If the account exists, a code was sent");
      setStep(2);
    });
  };

  const verifyCode = (e) => {
    e.preventDefault();
    if (otp.length !== 6) return context.openAlertBox("error", "Enter the 6-digit code");
    run(async () => {
      const d = await api.post("/users/verify-forgot-otp", { email, otp });
      setResetToken(d.resetToken);
      setStep(3);
    });
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (password.length < 8) return context.openAlertBox("error", "Password must be at least 8 characters");
    if (password !== confirm) return context.openAlertBox("error", "Passwords do not match");
    run(async () => {
      await api.post("/users/reset-password", { resetToken, newPassword: password });
      context.openAlertBox("success", "Password updated. Please login");
      navigate("/login", { replace: true });
    });
  };

  const spinner = <CircularProgress size={22} color="inherit" />;

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-full max-w-[400px] m-auto rounded-md bg-white p-5 px-6 sm:px-10">
          <h3 className="text-center text-[18px] text-black">Forgot password</h3>

          {step === 1 && (
            <form className="w-full mt-5" onSubmit={sendCode}>
              <TextField
                type="email"
                label="Your account email"
                variant="outlined"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" disabled={loading} className="btn-org btn-lg w-full !mt-5">
                {loading ? spinner : "Send code"}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form className="w-full mt-5" onSubmit={verifyCode}>
              <p className="text-center">Enter the code we sent to <b className="break-all">{email}</b></p>
              <OtpBox length={6} onChange={setOtp} />
              <Button type="submit" disabled={loading} className="btn-org btn-lg w-full !mt-5">
                {loading ? spinner : "Verify code"}
              </Button>
            </form>
          )}

          {step === 3 && (
            <form className="w-full mt-5" onSubmit={changePassword}>
              <div className="mb-5">
                <TextField
                  type="password"
                  label="New password"
                  variant="outlined"
                  className="w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div className="mb-5">
                <TextField
                  type="password"
                  label="Confirm password"
                  variant="outlined"
                  className="w-full"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <Button type="submit" disabled={loading} className="btn-org btn-lg w-full">
                {loading ? spinner : "Change password"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
