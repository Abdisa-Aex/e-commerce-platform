import { Button, TextField } from "@mui/material";
import React from "react";
import { FaCloudUploadAlt, FaRegUser } from "react-icons/fa";
import { IoIosLogOut, IoMdHeartEmpty } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import AccountSidebar from "../../components/AccountSidebar";

const MyAccount = () => {
  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          
          <AccountSidebar  />
        </div>

        <div className="col2 w-[50%]">
          <div className="caed bg-white p-5 shadow-md rounded-md">
            <h2 className="p-3 ">My Profile</h2>
            <hr />

            <form className="mt-5">
              <div className="flex items-center gap-5  ">
                <div className="w-[50%]">
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    label="Email"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex items-center mt-4 gap-5  ">
                <div className="w-[50%]">
                  <TextField
                    label="phone Number"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
              </div>
              <br />
              <div className="flex items-center gap-4">
                <Button className="btn-org btn-lg w-[100px]">save</Button>
                <Button className="btn-org btn-border btn-lg w-[100px]">cancel</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
