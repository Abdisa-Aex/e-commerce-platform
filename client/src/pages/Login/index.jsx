import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { IoLogoGoogleplus, IoMdEye, IoMdEyeOff } from "react-icons/io";
import{  FcGoogle  } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContest } from "../../App";
const Login = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormFields] = useState({
    email: '',
    password:''
})

  const history = useNavigate();
  const contest = useContext(MyContest);
  
  const forgotPassword = () => {

    
      history("/verify")
      contest.openAlertBox('success','opt send')
 
  };



  return (
    <section className="section py-10 ">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-black">
            login to your account
          </h3>
          <form className="w-full mt-5">
            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                label="email id"
                variant="outlined"
                className="w-full"
                name="name"
              />
            </div>
            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow === false ? "password" : "text"}
                id="password"
                label="password"
                variant="outlined"
                className="w-full"
                name="password"
              />
              <Button 
                className="!absolute !top-[10px] 
              !right-[10px] z-50 !w-[35px] 
              !h-[35px] !min-w-[35px] !rounded-full !text-black"
                onClick={() => setIsPasswordShow(!isPasswordShow)}
              >
                {isPasswordShow === false ? (
                  <IoMdEye className="text-[20px] opacity-75" />
                ) : (
                  <IoMdEyeOff className="text-[20px] opacity-75" />
                )}
              </Button>
             
            
              
              
            </div>
            <a className="link cursor-pointer text-[14px] font-[600]" onClick={forgotPassword}>
              Forgot password
            </a>
            <div className="flex items-center w-full mt-3 mb-3">
              <Button className="btn-org btn-lg w-full">login</Button>
            </div>
            <p className="text-center">
              Not Registered?{" "}
              <Link className="link !text-[15px] !font-[600] !text-primary" to="/register">
                Sign Up
              </Link>{" "}
            </p>
            <p className="text-center font-[500]">
              Or continue with social account
            </p>
            <Button className="flex gap-3 w-full !bg-[#f1f1f1]">
              <FcGoogle className="text-[25px]"/> Login with Google
            </Button>
          </form>
        </div>
      </div>
    </section>

    
  );
};

export default Login;
