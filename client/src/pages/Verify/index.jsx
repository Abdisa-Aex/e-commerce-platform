import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import OtpBox from "../../components/OtpBox";
import { MyContest } from "../../App";
import api from "../../api";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(MyContest);
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(30);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  // opened directly without registering first
  if (!email) return <Navigate to="/register" replace />;

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      context.openAlertBox("error", "Enter the 6-digit code");
      return;
    }
    setLoading(true);
    try {
      await api.post("/users/verify-email", { email, otp });
      context.openAlertBox("success", "Email verified. You can login now");
      navigate("/login", { replace: true });
    } catch (err) {
      context.openAlertBox("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    try {
      await api.post("/users/resend-otp", { email });
      context.openAlertBox("success", "A new code was sent");
      setCooldown(30);
    } catch (err) {
      context.openAlertBox("error", err.message);
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-full max-w-[400px] m-auto rounded-md bg-white p-5 px-6 sm:px-10">
          <div className="text-center flex items-center justify-center">
            <img src="/shields/shield.png" width="80" alt="" />
          </div>
          <h3 className="text-center text-[18px] text-black mt-4 mb-1">Verify your email</h3>
          <p className="text-center mt-0 mb-4">
            We sent a code to <span className="text-primary font-bold break-all">{email}</span>
          </p>
          <form onSubmit={verifyOtp}>
            <OtpBox length={6} onChange={setOtp} />
            <div className="flex items-center justify-center mt-5 px-3">
              <Button type="submit" disabled={loading} className="w-full btn-org btn-lg">
                {loading ? <CircularProgress size={22} color="inherit" /> : "Verify"}
              </Button>
            </div>
          </form>
          <p className="text-center mt-4 mb-0 text-[14px]">
            {cooldown > 0 ? (
              <>Resend code in {cooldown}s</>
            ) : (
              <button type="button" className="link font-[600]" onClick={resend}>
                Resend code
              </button>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Verify;
