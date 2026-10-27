import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { createContext, lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { CircularProgress, Drawer, useMediaQuery } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import api, { tokens } from "./api";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const ProductForm = lazy(() => import("./pages/Products/ProductForm"));
const Category = lazy(() => import("./pages/Category"));
const SubCategory = lazy(() => import("./pages/Category/SubCategory"));
const HomeSliderBanners = lazy(() => import("./pages/HomeSliderBanners"));
const Users = lazy(() => import("./pages/Users"));
const Orders = lazy(() => import("./pages/Orders"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));

const MyContest = createContext();

const Spinner = () => (
  <div className="flex items-center justify-center py-24">
    <CircularProgress />
  </div>
);

const SIDEBAR_WIDTH = 260;

// Everything except /login requires a logged-in ADMIN
const Shell = ({ ctx }) => {
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const { isSidebarOpen, setIsSidebarOpen } = ctx;

  if (!ctx.ready) return <Spinner />;
  if (!ctx.isLogin) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  const showFixed = isDesktop && isSidebarOpen;

  return (
    <section className="main min-h-screen">
      {isDesktop ? (
        isSidebarOpen && (
          <div className="fixed top-0 left-0 h-full z-40" style={{ width: SIDEBAR_WIDTH }}>
            <Sidebar />
          </div>
        )
      ) : (
        <Drawer open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
          <div style={{ width: SIDEBAR_WIDTH }} className="h-full">
            <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
          </div>
        </Drawer>
      )}

      <div className="transition-all" style={{ marginLeft: showFixed ? SIDEBAR_WIDTH : 0 }}>
        <Header />
        <div className="contentRight py-4 px-3 md:px-5">
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/new" element={<ProductForm />} />
              <Route path="/products/:id/edit" element={<ProductForm />} />
              <Route path="/category/list" element={<Category />} />
              <Route path="/subcategory/list" element={<SubCategory />} />
              <Route path="/homeslider/list" element={<HomeSliderBanners />} />
              <Route path="/users" element={<Users />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </section>
  );
};

function App() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 900 : true
  );

  const openAlertBox = useCallback((status, msg) => {
    if (status === "success") toast.success(msg);
    if (status === "error") toast.error(msg);
  }, []);

  const login = useCallback(async (data) => {
    if (data.user?.role !== "ADMIN") {
      throw new Error("This account is not an administrator");
    }
    tokens.save(data);
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      if (tokens.access) await api.post("/users/logout", { refreshToken: tokens.refresh });
    } catch {
      /* already expired */
    }
    tokens.clear();
    setUser(null);
  }, []);

  useEffect(() => {
    (async () => {
      if (tokens.access || tokens.refresh) {
        try {
          const d = await api.get("/users/me");
          if (d.user.role === "ADMIN") setUser(d.user);
          else tokens.clear();
        } catch {
          tokens.clear();
        }
      }
      setReady(true);
    })();
    const onLogout = () => setUser(null);
    window.addEventListener("auth:logout", onLogout);
    return () => window.removeEventListener("auth:logout", onLogout);
  }, []);

  const ctx = useMemo(
    () => ({
      user,
      isLogin: !!user,
      ready,
      login,
      logout,
      openAlertBox,
      isSidebarOpen,
      setIsSidebarOpen,
    }),
    [user, ready, login, logout, openAlertBox, isSidebarOpen]
  );

  return (
    <>
      <BrowserRouter>
        <MyContest.Provider value={ctx}>
          <Routes>
            <Route path="/login" element={ctx.isLogin ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/*" element={<Shell ctx={ctx} />} />
          </Routes>
        </MyContest.Provider>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
export { MyContest };
