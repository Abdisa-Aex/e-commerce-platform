// import Button from "@mui/material/Button";
import React, { useContext } from "react";
import { IoMdAdd } from "react-icons/io";

import Pagination from "@mui/material/Pagination";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
// import TableHead from "@mui/material/";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import Select from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { Button, TableHead } from "@mui/material";
import { FaRegEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBox from "../../components/SearchBox";
import { MyContest } from "../../App";
import {MdLocalPhone, MdOutlineMarkEmailRead } from 'react-icons/md'
import {SlCalender} from 'react-icons/sl'
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
  
  { id: "userImg", label: "USER IMAGE", minWidth: 200 },
  { id: "userName", label: "USER NAME", minWidth: 200 },
  {
    id: "userEmail",
    label: "USER EMAIL",
    minWidth: 200,
  },

  {
    id: "userPh",
    label: "USER PHONE NO",
    minWidth: 200,
  },
  {
    id: "createdDate",
    label: "CREATED DATE",
    minWidth: 200,
  },
];
const Users = () => {
  const count = 100;

  // handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const context = useContext(MyContest);
  return (
    <>
      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white ">
        <div className="flex items-center w-full px-5 justify-between ">
          <div className="col w-[40%]">
            <h2 className="text-[18px] font-[600]">
              Users List
              <span className="font-[400] text-[14px]">
                (material ui table)
              </span>
            </h2>
          </div>
          <div className="col w-[40%] ml-auto ">
            <SearchBox />
          </div>
        </div>
        <br />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticty table">
            <TableHead>
              <TableRow>
                <TableCell width={80}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    width={column.minWidth}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px] ">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745" data-discover="true">
                        <img
                          src="1.jpg"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  Alexo
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead /> Alexo@gmail.com
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +2519...
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <SlCalender /> 12-12-25
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px] ">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745" data-discover="true">
                        <img
                          src="1.jpg"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  Alexo
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead /> Alexo@gmail.com
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +2519...
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <SlCalender /> 12-12-25
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px] ">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745" data-discover="true">
                        <img
                          src="1.jpg"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  Alexo
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead /> Alexo@gmail.com
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +2519...
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <SlCalender /> 12-12-25
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px] ">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745" data-discover="true">
                        <img
                          src="1.jpg"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  Alexo
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead /> Alexo@gmail.com
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +2519...
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <SlCalender /> 12-12-25
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={count} // total number of rows
          page={page} // current page
          onPageChange={handleChangePage} // page change handler
          rowsPerPage={rowsPerPage} // rows per page
          onRowsPerPageChange={handleChangeRowsPerPage} // rows per page change
          rowsPerPageOptions={[10, 25, 100]}
        />
      </div>
    </>
  );
};

export default Users;
