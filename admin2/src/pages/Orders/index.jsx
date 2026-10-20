import { Button } from "@mui/material";
import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Badge from "../../components/Badge";
import SearchBox from "../../components/SearchBox";

const Orders = () => {
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };
  return (
    <div className="card my-4 shadow-md sm:rounded-lg bg-white ">
      <div className="flex items-center justify-between px-5 py-5">
        <h2 className="text-[20px] font-[600]">Recent Orders</h2>
        <div className="w-[40%]">
          <SearchBox />
        </div>
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
  );
};

export default Orders;
