import { Button, TextField } from "@mui/material";
import React from "react";
import { BsFillBagCheckFill } from "react-icons/bs";

const CheckOut = () => {
  return (
    <section className="py-10">
      <div className="container flex gap-5">
        <div className="leftCol w-[70%]">
          <div className="card bg-white w-full shadow-md p-5 rounded-md">
            <h2>Billing Details</h2>

            <form className="w-full mt-5">
              <div className="flex items-center gap-5  pb-5">
                <div className="col w-[50%]">
                  <TextField
                    className="w-full"
                    label="Full Name"
                    size="small"
                    variant="outlined"
                  />
                </div>
                <div className="col w-[50%]">
                  <TextField
                    className="w-full"
                    type="email"
                    label="Email"
                    size="small"
                    variant="outlined"
                  />
                </div>
              </div>
              <h6 className="text-[14px] font-[500] mb-3">street address *</h6>
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-[100%]">
                  <TextField
                    className="w-full"
                    label="House No. And Street Name"
                    size="small"
                    variant="outlined"
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-[100%]">
                  <TextField
                    className="w-full"
                    label="Apartement,suite,unit,etc (optional) "
                    size="small"
                    variant="outlined"
                  />
                </div>
              </div>
              {/* <h6 className="text-[14px] font-[500] mb-3">Town / City *</h6> */}
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-[50%]">
                  <TextField
                    className="w-full"
                    label="Town / City *"
                    size="small"
                    variant="outlined"
                  />
                </div>
                <div className="col w-[50%]">
                  <TextField
                    className="w-full"
                    type="text"
                    label="State / Country *"
                    size="small"
                    variant="outlined"
                  />
                </div>
              </div>

              <h6 className="text-[14px] font-[500] mb-3">PostCode / ZIP *</h6>
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-[100%]">
                  <TextField
                    className="w-full"
                    label="ZIP Code *"
                    size="small"
                    variant="outlined"
                  />
                </div>
                          </div>
                          
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-[50%]">
                  <TextField
                    className="w-full"
                    label="Phone Number *"
                    size="small"
                    variant="outlined"
                  />
                </div>
                <div className="col w-[50%]">
                  <TextField
                    className="w-full"
                    type="text"
                    label="Email Address  *"
                    size="small"
                    variant="outlined"
                  />
                </div>
              </div>
            </form>
          </div>
              </div>
              
              <div className="rightCol w-[30%]">
                  

                  <div className="card shadow-md bg-white p-5 rounded-md">
                      <h2 className="mb-4">your order</h2>
                  
                      <div className="flex items-center justify-between py-3 border-y border-[rgba(0,0,0,0.1)]  ">
                        <span className="text-[14px] font-[600]">Product</span>  
                        <span className="text-[14px] font-[600]">SubTotal</span>  
                      </div>

                      <div className=" mb-5scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2">

                      <div className="flex items-center justify-between   py-2">
                          <div className="part1 flex items-center gap-3">
                              <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                                  <img src="/asset2/ img2.jpg" className="w-full transition-all group-hover:scale-105"/>
                              </div>
                              <div className="info">
                                  <h4 className="text-[14px]">A-Line kurti with sh..x1</h4>
                                  <p className="text-[13px]">Qty : 1</p>
                              </div>
                          </div>
                          <span className="text-[14px] font-[500]">$1,300.00</span>
                      </div>
                      <div className="flex items-center justify-between   py-2">
                          <div className="part1 flex items-center gap-3">
                              <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                                  <img src="/asset2/ img2.jpg" className="w-full transition-all group-hover:scale-105"/>
                              </div>
                              <div className="info">
                                  <h4 className="text-[14px]">A-Line kurti with sh..x1</h4>
                                  <p className="text-[13px]">Qty : 1</p>
                              </div>
                          </div>
                          <span className="text-[14px] font-[500]">$1,300.00</span>
                      </div>
                      <div className="flex items-center justify-between   py-2">
                          <div className="part1 flex items-center gap-3">
                              <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                                  <img src="/asset2/ img2.jpg" className="w-full transition-all group-hover:scale-105"/>
                              </div>
                              <div className="info">
                                  <h4 className="text-[14px]">A-Line kurti with sh..x1</h4>
                                  <p className="text-[13px]">Qty : 1</p>
                              </div>
                          </div>
                          <span className="text-[14px] font-[500]">$1,300.00</span>
                          </div>
                      </div>
                      
<Button className="btn-org btn-lg w-full flex items-center gap-2"> <BsFillBagCheckFill className="text-[22px]"  /> CheckOut</Button>


                  </div>
</div>


      </div>
    </section>
  );
};

export default CheckOut;
