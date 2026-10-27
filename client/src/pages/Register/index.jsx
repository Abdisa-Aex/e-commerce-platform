import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { MyContest } from "../../App";
import api from "../../api";

const Register = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(MyContest);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      context.openAlertBox("error", "Fill in all the fields");
      return;
    }
    if (form.password.length < 8) {
      context.openAlertBox("error", "Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      await api.post("/users/register", form);
      context.openAlertBox("success", "We sent a 6-digit code to your email");
      navigate("/verify", { state: { email: form.email } });
    } catch (err) {
      context.openAlertBox("error", err.message);
      // account was created but the email failed: let them request the code again
      if (err.status === 502) navigate("/verify", { state: { email: form.email } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-full max-w-[400px] m-auto rounded-md bg-white p-5 px-6 sm:px-10">
          <h3 className="text-center text-[18px] text-black">Register a new account</h3>
          <form className="w-full mt-5" onSubmit={submit}>
            <div className="form-group w-full mb-5">
              <TextField
                type="text"
                label="Full name"
                variant="outlined"
                className="w-full"
                value={form.name}
                onChange={set("name")}
                autoComplete="name"
              />
            </div>
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
                label="Password (min 8 characters)"
                variant="outlined"
                className="w-full"
                value={form.password}
                onChange={set("password")}
                autoComplete="new-password"
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

            <div className="flex items-center w-full mt-3 mb-3">
              <Button type="submit" disabled={loading} className="btn-org btn-lg w-full">
                {loading ? <CircularProgress size={22} color="inherit" /> : "Register"}
              </Button>
            </div>
            <p className="text-center">
              Already have an account?{" "}
              <Link className="link !text-[15px] !font-[600] !text-primary" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
