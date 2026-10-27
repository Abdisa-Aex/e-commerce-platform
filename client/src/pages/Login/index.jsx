import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MyContest } from "../../App";
import api from "../../api";

const Login = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(MyContest);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      context.openAlertBox("error", "Enter your email and password");
      return;
    }
    setLoading(true);
    try {
      const data = await api.post("/users/login", form);
      await context.login(data);
      context.openAlertBox("success", "Welcome back!");
      navigate(location.state?.from || "/", { replace: true });
    } catch (err) {
      // account exists but email not verified yet -> send them to the code page
      if (err.status === 403 && /verify/i.test(err.message)) {
        await api.post("/users/resend-otp", { email: form.email }).catch(() => {});
        context.openAlertBox("error", err.message);
        navigate("/verify", { state: { email: form.email } });
      } else {
        context.openAlertBox("error", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-full max-w-[400px] m-auto rounded-md bg-white p-5 px-6 sm:px-10">
          <h3 className="text-center text-[18px] text-black">Login to your account</h3>
          <form className="w-full mt-5" onSubmit={submit}>
            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                className="w-full"
                value={form.email}
                onChange={set("email")}
                autoComplete="email"
              />
            </div>
            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow ? "text" : "password"}
                label="Password"
                variant="outlined"
                className="w-full"
                value={form.password}
                onChange={set("password")}
                autoComplete="current-password"
              />
              <Button
                type="button"
                className="!absolute !top-[10px] !right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                onClick={() => setIsPasswordShow(!isPasswordShow)}>
                {isPasswordShow ? (
                  <IoMdEyeOff className="text-[20px] opacity-75" />
                ) : (
                  <IoMdEye className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>
            <Link to="/forgot-password" className="link cursor-pointer text-[14px] font-[600]">
              Forgot password?
            </Link>
            <div className="flex items-center w-full mt-3 mb-3">
              <Button type="submit" disabled={loading} className="btn-org btn-lg w-full">
                {loading ? <CircularProgress size={22} color="inherit" /> : "Login"}
              </Button>
            </div>
            <p className="text-center">
              Not registered?{" "}
              <Link className="link !text-[15px] !font-[600] !text-primary" to="/register">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
