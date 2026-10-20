import Button from "@mui/material/Button";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Save";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const SignUp= () => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleClickGoogle = () => {
    setLoadingGoogle(true);
  };
  const [loadingFb, setLoadingFb] = useState(false);

  const handleClickFb = () => {
    setLoadingFb(true);
  };

  const [isPasswordShow, setIsPasswordShow] = useState(true);

  return (
    <section className="  bg-white w-full ">
      <header className="w-full fixed top-0 left-0   px-4 py-3 flex items-center justify-between z-50">
        <Link to="/">
          <img src="isomor.svg" alt="" className="w-[200px]" />
        </Link>

        <div className="flex items-center gap-0">
          <NavLink to="/login" exact={true} activeClassName="isActive">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] flex gap-1 !py-5 ">
              <CgLogIn className="text-[18px]" />
              Login
            </Button>
          </NavLink>
          <NavLink to="/sign-up" exact={true} activeClassName="isActive">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] flex gap-1 !py-5">
              <FaRegUser className="text-[15px]" />
              sign out
            </Button>
          </NavLink>
        </div>
      </header>
      <img src="pattern.webp" alt="" className="fixed top-0 left-0 opacity-5" />

      <div className="loginBox card w-[600px] h-[auto] pb-20 mx-auto pt-20 relative z-50">
        <div className="text-center">
          <img src="isomor.svg" alt="" className="m-auto" />
        </div>
        <h1 className="text-center text-[35px] font-[800] mt-4">
          Join us today! Get special <br /><span className="text-primary"> benefits and stay up-to-date </span>
        </h1>
        <div className="flex items-center justify-center w-full mt-5 gap-5">
          <LoadingButton
            size="small"
            onClick={handleClickGoogle}
            endIcon={<FcGoogle />}
            loading={loadingGoogle}
            loadingPosition="end"
            variant="outlined"
            className="!bg-none !py-2 !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]">
            signin with Google
          </LoadingButton>
          <LoadingButton
            size="small"
            onClick={handleClickFb}
            endIcon={<BsFacebook />}
            loading={loadingFb}
            loadingPosition="end"
            variant="outlined"
            className="!bg-none !py-2 !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]">
            signin with Facebook
          </LoadingButton>
        </div>
        <br />

        <div className="w-full flex items-center justify-center gap-3">
          <span className="flex items-center w-[100px] h-[1px]  bg-[rgba(0,0,0,0.2)]"></span>
          <span className="text-[14px] font-[500]">
            or, Sign with your email
          </span>
          <span className="flex items-center w-[100px] h-[1px]  bg-[rgba(0,0,0,0.2)]"></span>
        </div>
        <br />
        <form className="w-full px-8 mt-3">
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Full Name</h4>
            <input
              type="text"
              className="w-full h-[50px]  border-2 focus:border-[rgba(0,0,0,0.7)]  rounded-md focus: outline-primary  px-3"
            />
          </div>
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Email</h4>
            <input
              type="email"
              className="w-full h-[50px]  border-2 focus:border-[rgba(0,0,0,0.7)]  rounded-md focus: outline-primary  px-3"
            />
          </div>
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Password</h4>
            <div className="relative w-full">
              <input
                type={isPasswordShow === false ? "text" : "password"}
                className="w-full h-[50px]  border-2 focus:border-[rgba(0,0,0,0.7)]   rounded-md focus:outline-primary  px-3"
              />
              <Button
                className="!absolute !top-[7px] !right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-500"
                onClick={() => setIsPasswordShow(!isPasswordShow)}>
                {isPasswordShow === false ? (
                  <FaRegEye className="!text-[18px]" />
                ) : (
                  <FaEyeSlash className="!text-[18px]" />
                )}{" "}
              </Button>
            </div>
          </div>
          <div className="form-group mb-4 w-full flex items-center justify-between">
            <FormControlLabel
              className="!text-[10px]"
              control={<Checkbox defaultChecked />}
              label="Remember Me"
            />
            <Link
              to="/forgote-password"
              className="text-primary text-[15px] font-[700] hover:underline hover:text-[#ff5252]">
              Forgote Password ?
            </Link>
          </div>
          <Button className="btn-blue btn-lg w-full">Sign up</Button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
