import { Button } from '@mui/material'
import React from 'react'
import { FaCloudUploadAlt, FaRegUser } from 'react-icons/fa'
import { IoIosLogOut, IoMdHeartEmpty } from 'react-icons/io'
import { IoBagCheckOutline } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

const AccountSidebar = () => {
  return (
    <div className="card bg-white shadow-md rounded-md  sticky top-[10px] ">
    <div className="w-full p-5 flex items-center justify-center flex-col">
      <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group">
        <img src="/asset/1.jpg " className="w-full object-cover" />
        <div className="overlay w-[100%] h-[100%] cursor-pointer absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7) flex items-center justify-center opacity-0 transition-all group-hover:opacity-100">
          <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
          <input
            type="file"
            className="absolute top-0 left-0 w-full h-full opacity-0"
          />
        </div>
      </div>
      <h3>name of under photo</h3>
      <h6 className="text-[14px] font-[500]">yourname222@gmail.com</h6>
    </div>

    <ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs">
      <li className="w-full">
        <NavLink
          to="/my-account"
          exact={true}
          activeclassName="isActive"
        >
          <Button className="w-full !text-left !py-2 !px-5  !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
            <FaRegUser className="text-[15px]" /> my profile
          </Button>
        </NavLink>
      </li>
      <li className="w-full">
        <NavLink to="/my-list" exact={true} activeclassName="isActive">
          <Button className="w-full !text-left !py-2 !px-5  !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
            <IoMdHeartEmpty className="text-[17px]" /> my list
          </Button>
        </NavLink>
      </li>
      <li className="w-full">
        <NavLink
          to="/my-orders"
          exact={true}
          activeclassName="isActive"
        >
          <Button className="w-full !text-left !py-2 !px-5  !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
            <IoBagCheckOutline className="text-[17px]" /> my order
          </Button>
        </NavLink>
      </li>
      <li className="w-full">
        <Button className="w-full !text-left !py-2 !px-5  !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
          <IoIosLogOut className="text-[18px]" /> log out
        </Button>
      </li>
    </ul>
  </div>
  )
}

export default AccountSidebar
