import { Button, CircularProgress } from "@mui/material";
import React, { useContext, useState } from "react";
import { FaCloudUploadAlt, FaRegUser } from "react-icons/fa";
import { IoIosLogOut, IoMdHeartEmpty } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { MyContest } from "../../App";
import api from "../../api";
import { NO_IMAGE } from "../../utils";

const tabBtn =
  "w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2";

const AccountSidebar = () => {
  const { user, setUser, logout, openAlertBox } = useContext(MyContest);
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return openAlertBox("error", "Image is too large (max 5MB)");
    const fd = new FormData();
    fd.append("avatar", file);
    setUploading(true);
    try {
      const d = await api.put("/users/avatar", fd);
      setUser(d.user);
      openAlertBox("success", "Photo updated");
    } catch (err) {
      openAlertBox("error", err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="card bg-white shadow-md rounded-md lg:sticky top-[10px]">
      <div className="w-full p-5 flex items-center justify-center flex-col">
        <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group">
          <img src={user?.avatar || NO_IMAGE} alt="" className="w-full h-full object-cover" />
          <div className="overlay w-full h-full cursor-pointer absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.6)] flex items-center justify-center opacity-0 transition-all group-hover:opacity-100">
            {uploading ? (
              <CircularProgress size={24} color="inherit" className="!text-white" />
            ) : (
              <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={upload}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <h3>{user?.name}</h3>
        <h6 className="text-[14px] font-[500] break-all text-center">{user?.email}</h6>
      </div>

      <ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs">
        <li className="w-full">
          <NavLink to="/my-account" end>
            <Button className={tabBtn}><FaRegUser className="text-[15px]" /> my profile</Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/my-list">
            <Button className={tabBtn}><IoMdHeartEmpty className="text-[17px]" /> my list</Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/my-orders">
            <Button className={tabBtn}><IoBagCheckOutline className="text-[17px]" /> my orders</Button>
          </NavLink>
        </li>
        <li className="w-full">
          <Button className={tabBtn} onClick={handleLogout}>
            <IoIosLogOut className="text-[18px]" /> log out
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default AccountSidebar;
