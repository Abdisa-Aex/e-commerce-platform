import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import * as React from "react";
// import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import { createContext, useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import AddProducts from "./pages/Products/AddProducts";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { IoMdClose } from "react-icons/io";
import Slide from "@mui/material/Slide";
import HomeSliderBanners from "./pages/HomeSliderBanners";
import AddHomeSlide from "./pages/HomeSliderBanners/addHomeSlide";
import Category from "./pages/Category";
import CategoryList from "./pages/Category";
import AddCategory from "./pages/Category/addCategory";
import SubCategoryList from "./pages/Category/SubCatList";
import AddSubCategory from "./pages/Category/addSubCategory ";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import ForgotePassword from "./pages/ForgotePassword";
import VerifyAccount from "./pages/VerifyAccount";
import ChangePassword from "./pages/ChangePassword";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide   direction="up" ref={ref} {...props} />;
});

const MyContest = createContext();
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: " ",
  });
 

  
  const router = createBrowserRouter([
    {
      path: "/orders",

      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentmain flex ">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[18%]"
                    : "w-[0px]  opacity-0 transition-all"
                }`}>
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5   ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                }  transition-all `}>
                <Orders />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/users",

      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentmain flex ">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[18%]"
                    : "w-[0px]  opacity-0 transition-all"
                }`}>
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5   ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                }  transition-all `}>
                <Users />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/category/List",

      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentmain flex ">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[18%]"
                    : "w-[0px]  opacity-0 transition-all"
                }`}>
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5   ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                }  transition-all `}>
                <CategoryList />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/HomeSlider/List",

      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentmain flex ">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[18%]"
                    : "w-[0px]  opacity-0 transition-all"
                }`}>
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5   ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                }  transition-all `}>
                <HomeSliderBanners />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/SubCategory/List",

      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentmain flex ">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[18%]"
                    : "w-[0px]  opacity-0 transition-all"
                }`}>
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5   ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                }  transition-all `}>
                <SubCategoryList />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/products",

      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentmain flex ">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[18%]"
                    : "w-[0px]  opacity-0 transition-all"
                }`}>
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5   ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                }  transition-all `}>
                <Products />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/",

      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentmain flex ">
              <div
                className={`overflow-hidden sidebarWrapper ${
                  isSidebarOpen === true
                    ? "w-[18%]"
                    : "w-[0px]  opacity-0 transition-all"
                }`}>
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5   ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                }  transition-all `}>
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/sign-up",

      element: (
        <>
          <SignUp />
        </>
      ),
    },
    {
      path: "/forgote-password",

      element: (
        <>
          <ForgotePassword />
        </>
      ),
    },
    {
      path: "/login",

      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/verify-account",

      element: (
        <>
          <VerifyAccount />
        </>
      ),
    },
    {
      path: "/change-password",

      element: (
        <>
          <ChangePassword />
        </>
      ),
    },
    {
      path: "/product/upload",

      element: (
        <>
          <AddProducts />
        </>
      ),
    },
  ]);
  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    setIsLogin,
    isLogin,
    setIsOpenFullScreenPanel,
    isOpenFullScreenPanel
  };

  return (
    <>
      <MyContest.Provider value={values}>
        <RouterProvider router={router} />

        <Dialog
          fullScreen
          open={isOpenFullScreenPanel.open}
          onClose={() =>
            setIsOpenFullScreenPanel({
              open: false,
              // model: "Product",
            })
          }
          slots={{
            transition: Transition,
          }}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() =>
                  setIsOpenFullScreenPanel({
                    open: false,
                    // model: " product",
                  })
                }
                aria-label="close">
                <IoMdClose className="text-gray-800" />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <span className="text-gray-800">
                  {isOpenFullScreenPanel?.model}
                </span>
              </Typography>
            </Toolbar>
          </AppBar>
          {isOpenFullScreenPanel?.model === "Add Product" && <AddProducts />}
          {isOpenFullScreenPanel?.model === "Add Home Slide" && (
            <AddHomeSlide />
          )}
          {isOpenFullScreenPanel?.model === "Add New Category" && (
            <AddCategory />
          )}
          {isOpenFullScreenPanel?.model === "Add New Sub Category" && (
            <AddSubCategory />
          )}
        </Dialog>
      </MyContest.Provider>
    </>
  );
}

export default App;

export { MyContest };
