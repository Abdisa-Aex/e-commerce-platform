import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { MyContest } from "../../App";
import api from "../../api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const context = useContext(MyContest);
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      context.openAlertBox("error", "Enter your email and password");
      return;
    }
    setLoading(true);
    try {
      const data = await api.post("/users/login", form);
      await context.login(data); // throws if the account is not an ADMIN
      context.openAlertBox("success", "Welcome back");
      navigate(location.state?.from || "/", { replace: true });
    } catch (err) {
      context.openAlertBox("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white w-full min-h-screen flex items-center justify-center px-4">
      <div className="loginBox card w-full max-w-[460px] py-10">
        <div className="text-center">
          <img src="/isomor.svg" alt="" className="m-auto w-[160px]" />
        </div>
        <h1 className="text-center text-[28px] md:text-[32px] font-[800] mt-4 mb-1">Admin sign in</h1>
        <p className="text-center text-[14px] mb-6">Sign in with your administrator account</p>

        <form className="w-full" onSubmit={submit}>
          <div className="mb-4">
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              className="w-full"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
            />
          </div>
          <div className="mb-5 relative">
            <TextField
              type={show ? "text" : "password"}
              label="Password"
              variant="outlined"
              className="w-full"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete="current-password"
            />
            <Button
              type="button"
              className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-[#000]"
              onClick={() => setShow(!show)}
              aria-label="show password">
              {show ? <FaEyeSlash className="text-[18px] opacity-75" /> : <FaRegEye className="text-[18px] opacity-75" />}
            </Button>
          </div>
          <Button type="submit" disabled={loading} className="btn-blue btn-lg w-full">
            {loading ? <CircularProgress size={22} color="inherit" /> : "Sign in"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
