import React, { useState, PureComponent, useContext } from "react";
import DashboardBoxes from "../../components/DashboardBoxes";
import Button from "@mui/material/Button";
import { FaPlus, FaRegEye } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import Badge from "../../components/Badge";
import { FaAngleUp } from "react-icons/fa6";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
// import Tooltip from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import Select from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MyContest } from "../../App";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  // { id: "id", label: "ID", minWidth: 80 },
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  {
    id: "subcategory",
    label: "SUB CATEGORY",
    minWidth: 150,
  },

  {
    id: "price",
    label: "PRICE",
    minWidth: 130,
  },
  {
    id: "sales",
    label: "SALES",
    minWidth: 100,
  },

  {
    id: "action",
    label: "ACTION",
    minWidth: 80,
  },
];
function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const Dashboard = () => {
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [chart1Data, setChart1Data] = useState([
    {
      name: "Jan",
      TotalSales: 400,
      TotalUsers: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      TotalSales: 3000,
      TotalUsers: 2400,
      amt: 2400,
    },
    {
      name: "March",
      TotalSales: 400,
      TotalUsers: 2180,
      amt: 2400,
    },
    {
      name: "April",
      TotalSales: 400,
      TotalUsers: 2400,
      amt: 2400,
    },
    {
      name: "May",
      TotalSales: 400,
      TotalUsers: 2400,
      amt: 2400,
    },
    {
      name: "Jun",
      TotalSales: 2390,
      TotalUsers: 3800,
      amt: 2500,
    },
    {
      name: "July",
      TotalSales: 3490,
      TotalUsers: 4300,
      amt: 2100,
    },
    {
      name: "Aug",
      TotalSales: 3490,
      TotalUsers: 2300,
      amt: 2100,
    },
    {
      name: "Sept",
      TotalSales: 3490,
      TotalUsers: 4960,
      amt: 2100,
    },
    {
      name: "Oct",
      TotalSales: 3490,
      TotalUsers: 6600,
      amt: 2100,
    },
    {
      name: "Nov",
      TotalSales: 3490,
      TotalUsers: 2300,
      amt: 2800,
    },
    {
      name: "Dec",
      TotalSales: 3490,
      TotalUsers: 1300,
      amt: 2100,
    },
  ]);
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
   
  const count = 100;

  const context = useContext(MyContest);

 
  const handleChangeCateFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  return (
    <>
      <div className="w-full py-5 px-5 bg-[#f1faff] border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between">
        <div className="info">
          <h1 className="text-[35px] font-[600] leading-10 mb-3">
            Good Morning,
            <br /> World <span>👋</span>
          </h1>

          <p>
            here's what happening on your store today. see the statistics at
            once.
          </p>

          <br />
          <Button
            className="btn-blue !capitalize"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }>
            <FaPlus /> Add product
          </Button>
        </div>
        <img src="" alt="add image of hand" className="w-[250px]" />
      </div>
      <DashboardBoxes />

      <div className="card my-4 shadow-md sm:rounded-lg bg-white ">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[20px] font-[600]">
            products{" "}
            <span className="font-[400] text-[14px]">(Tailwind Css table)</span>
          </h2>
        </div>

        <div className="flex items-center w-full pl-5 justify-between pr-5">
          <div className="col w-[20%]">
            <h4 className="font-[600] text-[13px] mb-2">Category By</h4>

            <Select
              className="w-full "
              labelId="demo-simple-select-filled-label"
              id="demo-simple-selct-standard"
              value={categoryFilterVal}
              onChange={handleChangeCateFilter}
              label="category">
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              <MenuItem value={10}>Men</MenuItem>
              <MenuItem value={20}>Women</MenuItem>
              <MenuItem value={30}>Kids</MenuItem>
              {/* </MenuItem> */}
            </Select>
          </div>

          <div className="col w-[25%] ml-auto flex items-center gap-3">
            <Button className="btn !bg-green-600 !text-white btn-sm  ">
              {" "}
              Export
            </Button>
            <Button
              className="btn-blue btn-sm  !text-white "
              onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Product",
                })
              }>
              Add Product
            </Button>
          </div>
        </div>

        <div className="relative overflow-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50   dark:text-gray-700  ">
              <tr>
                <th scope="col" width="10%" className="px-6 pr-0 py-3">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </th>
                <th scope="col" className="px-0 py-3 whitespace-nowrap">
                  product
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  category
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  sub category
                </th>

                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  price
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  sales
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:text-gray-900    border-b dark:border-gray-200">
                <td className="px-6 pr-0 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-2">
                  <div className="flex items-center gap-4 w-[300px] ">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img
                          src="1.jpg"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h4 className="font-[600] text-[12px] leading-4 hover:text-primary  ">
                        <Link to="/product/45745">
                          vine women rayon karta pant set vine women rayon karta
                          pant set vine women rayon karta pant set
                        </Link>
                      </h4>
                      <span className="text[12px]"> books</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">Electronics</td>
                <td className="px-6 py-2">women</td>
                <td className="px-6 py-2">
                  <div className="flex gap-1 flex-col ">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $60.00
                    </span>
                    <span className="price text-primary   text-[15px] font-[600]">
                      $50.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]">
                    <span>342 </span> sale
                  </p>
                  <ProgressBar value={40} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-1">
                    {/* <Tooltip title="Edit Product" placement="top"> */}
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]  " />
                    </Button>
                    {/* </Tooltip> */}
                    {/* <Tooltip title="view Product details" placement="top"> */}
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]  " />
                    </Button>
                    {/* </Tooltip> */}
                    {/* <Tooltip title="Remove Product" placement="top"> */}
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]">
                      <GoTrash className="text-[rgba(0,0,0,0.7)] text-[20px]  " />
                    </Button>
                    {/* </Tooltip> */}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end pt-5 pb-5 px-4">
          <Pagination count={10} color="primary" />
        </div>
      </div>
      <div className="card my-4 shadow-md sm:rounded-lg bg-white ">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">
            products{" "}
            <span className="font-[400] text-[14px]">(material ui table)</span>
          </h2>
        </div>

        <div className="flex items-center w-full p-5 justify-between pr-5">
          <div className="col w-[20%]">
            <h4 className="font-[600] text-[13px] mb-2">Category By</h4>

            <Select
              className="w-full "
              labelId="demo-simple-select-filled-label"
              id="demo-simple-selct-standard"
              value={categoryFilterVal}
              onChange={handleChangeCateFilter}
              label="category">
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              <MenuItem value={10}>Men</MenuItem>
              <MenuItem value={20}>Women</MenuItem>
              <MenuItem value={30}>Kids</MenuItem>
           
            </Select>
          </div>

          <div className="col w-[25%] ml-auto flex items-center gap-3">
            <Button className="btn !bg-green-600 !text-white btn-sm  ">
              Export
            </Button>
            <Button
              className="btn-blue btn-sm  !text-white"
              onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Product",
                })
              }>
              Add Product
            </Button>
          </div>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticty table">
            <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px] ">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img
                          src="1.jpg"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h4 className="font-[600] text-[12px] leading-4 hover:text-primary  ">
                        <Link to="/product/45745">
                          vine women rayon karta pant set vine women rayon karta
                          pant set vine women rayon karta pant set
                        </Link>
                      </h4>
                      <span className="text[12px]"> books</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Eletronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  women
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-1 flex-col ">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $60.00
                    </span>
                    <span className="price text-primary   text-[15px] font-[600]">
                      $50.00
                    </span>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span>342 </span> sale
                  </p>
                  <ProgressBar value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
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
            <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px] ">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img
                          src="1.jpg"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h4 className="font-[600] text-[12px] leading-4 hover:text-primary  ">
                        <Link to="/product/45745">
                          vine women rayon karta pant set vine women rayon karta
                          pant set vine women rayon karta pant set
                        </Link>
                      </h4>
                      <span className="text[12px]"> books</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Eletronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  women
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-1 flex-col ">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $60.00
                    </span>
                    <span className="price text-primary   text-[15px] font-[600]">
                      $50.00
                    </span>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span>342 </span> sale
                  </p>
                  <ProgressBar value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
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
            <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px] ">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/45745">
                        <img
                          src="1.jpg"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h4 className="font-[600] text-[12px] leading-4 hover:text-primary  ">
                        <Link to="/product/45745">
                          vine women rayon karta pant set vine women rayon karta
                          pant set vine women rayon karta pant set
                        </Link>
                      </h4>
                      <span className="text[12px]"> books</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Eletronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  women
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-1 flex-col ">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $60.00
                    </span>
                    <span className="price text-primary   text-[15px] font-[600]">
                      $50.00
                    </span>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span>342 </span> sale
                  </p>
                  <ProgressBar value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-1">
                    {/* <Tooltip title="Edit Product" placement="top"> */}
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]  " />
                    </Button>
                    {/* </Tooltip> */}
                    {/* <Tooltip title="view Product details" placement="top"> */}
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]  " />
                    </Button>
                    {/* </Tooltip> */}
                    {/* <Tooltip title="Remove Product" placement="top"> */}
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1]">
                      <GoTrash className="text-[rgba(0,0,0,0.7)] text-[20px]  " />
                    </Button>
                    {/* </Tooltip> */}
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

      <div className="card my-4 shadow-md sm:rounded-lg bg-white ">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[20px] font-[600]">Recent Orders</h2>
        </div>

        <div className="relative overflow-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50   dark:text-gray-700  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  &nbsp;
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Paymant Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Pincode
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  User Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Status
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:text-gray-800 dark:border-gray-00">
                <td className="px-6 py-4 font-[500]">
                  <Button
                    className="!w-[35px] !h-[35px] !min-w-[35px] 
                        !rounded-full bg-[#f1f1f1]"
                    onClick={() => isShowOrderdProduct(1)}>
                    {isOpenOrderdProduct === 1 ? (
                      <FaAngleDown className="text-[16px]   text-[rgba(0,0,0,0.7)]" />
                    ) : (
                      <FaAngleUp className="text-[16px]   text-[rgba(0,0,0,0.7)]" />
                    )}
                  </Button>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary font-[600]">
                    {" "}
                    3863tr819r3rt7tr
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary font-[600]">pay_wkfwk</span>
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  your name
                </td>
                <td className="px-6 py-4 font-[500]">097466736</td>
                <td className="px-6 py-4 font-[500]">
                  <span className="block w-[400px] ">
                    H N0 222 Street N0 6 Bole H N0 222 Street N0 6 Bole H N0 222
                    Street N0 6 Bole apartement +251934534255
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">1000</td>
                <td className="px-6 py-4 font-[500]">20,000</td>
                <td className="px-6 py-4 font-[500]">your@gmail.com</td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary font-[600]">656273t7fg3</span>{" "}
                </td>
                <td className="px-6 py-4 font-[500]">
                  <Badge status="pending" />
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  2024-12-04
                </td>
              </tr>

              {isOpenOrderdProduct === 1 && (
                <tr>
                  <td className=" pl-20 " colSpan={6}>
                    <div className="relative overflow-auto  ">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-700  ">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap">
                              Paymant Id
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap">
                              Paymant Title
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap">
                              Image
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap">
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap">
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap">
                              SubTotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b dark:text-gray-800  dark:border-gray-00">
                            <td className="px-6 py-4 font-[500]">
                              <span className="text-gray-600">
                                {" "}
                                3863tr819r3rt7tr
                              </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              {" "}
                              A-line kurti ree & jf
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              <img
                                src="/1.jpg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                              45
                            </td>

                            <td className="px-6 py-4 font-[500]">90</td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                              90
                            </td>
                          </tr>
                          <tr className="bg-white border-b dark:text-gray-800  dark:border-gray-00">
                            <td className="px-6 py-4 font-[500]">
                              <span className="text-gray-600">
                                {" "}
                                3863tr819r3rt7tr
                              </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              {" "}
                              A-line kurti ree & jf
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              <img
                                src="/1.jpg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                              45
                            </td>

                            <td className="px-6 py-4 font-[500]">90</td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                              90
                            </td>
                          </tr>

                          <tr>
                            <td className="bg-[#f1f1f1]  " colSpan={12}></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
              <tr className="bg-white border-b dark:text-gray-800 dark:border-gray-00">
                <td className="px-6 py-4 font-[500]">
                  <Button
                    className="!w-[35px] !h-[35px] !min-w-[35px] 
                        !rounded-full bg-[#f1f1f1]"
                    onClick={() => isShowOrderdProduct(2)}>
                    {isOpenOrderdProduct === 2 ? (
                      <FaAngleDown className="text-[16px]   text-[rgba(0,0,0,0.7)]" />
                    ) : (
                      <FaAngleUp className="text-[16px]   text-[rgba(0,0,0,0.7)]" />
                    )}
                  </Button>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary font-[600]">
                    {" "}
                    3863tr819r3rt7tr
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary font-[600]">pay_wkfwk</span>
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  your name
                </td>
                <td className="px-6 py-4 font-[500] ">097466736</td>
                <td className="px-6 py-4 font-[500]">
                  <span className="block w-[400px] ">
                    H N0 222 Street N0 6 Bole H N0 222 Street N0 6 Bole H N0 222
                    Street N0 6 Bole apartement +251934534255
                  </span>
                </td>
                <td className="px-6 py-4 font-[500]">1000</td>
                <td className="px-6 py-4 font-[500]">20,000</td>
                <td className="px-6 py-4 font-[500]">your@gmail.com</td>
                <td className="px-6 py-4 font-[500]">
                  <span className="text-primary font-[600]">656273t7fg3</span>{" "}
                </td>
                <td className="px-6 py-4 font-[500]">
                  <Badge status="pending" />
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                  2024-12-04
                </td>
              </tr>

              {isOpenOrderdProduct === 2 && (
                <tr>
                  <td className=" pl-20 " colSpan={6}>
                    <div className="relative overflow-auto  ">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-700  ">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap">
                              Paymant Id
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap">
                              Paymant Title
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap">
                              Image
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap">
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap">
                              Price
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 whitespace-nowrap">
                              SubTotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b dark:text-gray-800  dark:border-gray-00">
                            <td className="px-6 py-4 font-[500]">
                              <span className="text-gray-600">
                                {" "}
                                3863tr819r3rt7tr
                              </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              {" "}
                              A-line kurti ree & jf
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              <img
                                src="/1.jpg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                              45
                            </td>

                            <td className="px-6 py-4 font-[500]">90</td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                              90
                            </td>
                          </tr>
                          <tr className="bg-white border-b dark:text-gray-800  dark:border-gray-00">
                            <td className="px-6 py-4 font-[500]">
                              <span className="text-gray-600">
                                {" "}
                                3863tr819r3rt7tr
                              </span>
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              {" "}
                              A-line kurti ree & jf
                            </td>
                            <td className="px-6 py-4 font-[500]">
                              <img
                                src="/1.jpg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                              45
                            </td>

                            <td className="px-6 py-4 font-[500]">90</td>
                            <td className="px-6 py-4 font-[500] whitespace-nowrap">
                              90
                            </td>
                          </tr>

                          <tr>
                            <td className="bg-[#f1f1f1]  " colSpan={12}></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white w-[100%] h-[30%] ">
        <div className="flex items-center justify-between px-5 py-5 pb-0">
          <h2 className="text-[18px] font-[600]">Total Users & Sales</h2>
        </div>
        <div className="flex items-center gap-5  px-5 py-5 pt-0">
          <span className="flex items-center gap-1 text[15px]">
            {" "}
            <span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span>
            Total Users
          </span>
          <span className="flex items-center gap-1 text[15px]">
            {" "}
            <span className="block w-[8px] h-[8px] rounded-full bg-primary"></span>
            Total Sales
          </span>
        </div>
        <ResponsiveContainer width="100%" height="84%">
          <LineChart
            width={1000}
            height={500}
            data={chart1Data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" stroke="none" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="TotalSales"
              stroke="#8884d8"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="TotalUsers"
              stroke="#82ca9d"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Dashboard;
