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

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
  // { id: "id", label: "ID", minWidth: 80 },
  { id: "image", label: "IMAGE", minWidth: 210 },
  { id: "catNmae", label: "CATEGORY NAME", minWidth: 150 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const CategoryList = () => {
  const [categoryFilterVal, setCategoryFilterVal] = useState("");

  const count = 100;

  const handleChangeCateFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

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
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">
          Category List
          <span className="font-[400] text-[14px]">(material ui table)</span>
        </h2>
        <div className="col w-[30%] ml-auto flex items-center justify-end  gap-3">
          <Button className="btn !bg-green-600 !text-white btn-sm  ">
            Export
          </Button>
          <Button
            className="btn-blue btn-sm  !text-white"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Category",
              })
            }>
            Add New Category
          </Button>
        </div>
      </div>

      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white ">
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
                    align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell width={80}>
                  <Checkbox {...label} size="small" />
                </TableCell>

                <TableCell width={100}>
                  <div className="flex items-center gap-4 w-[80px] ">
                    <div className="img w-full rounded-md overflow-hidden group">
                      <Link to="/product/45745" data-discover="true">
                        <img
                          src="/1.jpg"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>

                <TableCell width={100}>Fashion</TableCell>

                <TableCell width={100}>
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]  " />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]  " />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]">
                      <GoTrash className="text-[rgba(0,0,0,0.7)] text-[20px]  " />
                    </Button>
                  </div>
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

export default CategoryList;
