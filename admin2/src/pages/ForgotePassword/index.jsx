import Button from "@mui/material/Button";
 
import { Link, NavLink } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
 
import { FaRegUser } from "react-icons/fa6";
 
 
 
const ForgotePassword = () => {
   

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
          Having trouble to sign in? <br />
          <span className="text-primary">Reset your password.</span>
        </h1>

        <br />

        <form className="w-full px-8 mt-3">
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Email</h4>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-[50px]  border-2 focus:border-[rgba(0,0,0,0.7)]  rounded-md focus: outline-primary  px-3"
            />
          </div>

          <Button className="btn-blue btn-lg !capitalize  w-full h-[100vh]">
            reset password
          </Button>
          <br /> <br />
          <div className="text-center flex items-center justify-center gap-4">
            <span className="">Dont't want to reset?</span>
            <Link
              to="/forgote-password"
              className="text-primary text-[15px] font-[700] hover:underline hover:text-[#ff5252]">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotePassword;
