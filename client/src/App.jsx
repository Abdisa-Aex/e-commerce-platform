import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button, CircularProgress, Dialog, DialogContent } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductZoom from "./components/ProductZoom";
import ProductDetialsComponent from "./components/ProductDetails";
import Home from "./pages/Home";
import api, { tokens } from "./api";

// Everything except the home page is loaded on demand -> smaller first download
const ProductListing = lazy(() => import("./pages/Home/ProductListing"));
const ProductDetials = lazy(() => import("./pages/Home/ProductDetials"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const CartPage = lazy(() => import("./pages/Cart"));
const Verify = lazy(() => import("./pages/Verify"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const MyList = lazy(() => import("./pages/MyList"));
const Orders = lazy(() => import("./pages/Orders"));

const MyContest = createContext();

const Spinner = () => (
  <div className="flex items-center justify-center py-24">
    <CircularProgress />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

const Protected = ({ ready, isLogin, children }) => {
  const location = useLocation();
  if (!ready) return <Spinner />;
  if (!isLogin) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
};

const emptyCart = { items: [], count: 0, subTotal: 0 };

function App() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(emptyCart);
  const [wishlist, setWishlist] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [quickView, setQuickView] = useState(null);

  const isLogin = !!user;

  const openAlertBox = (status, msg) => {
    if (status === "success") toast.success(msg);
    if (status === "error") toast.error(msg);
  };
  const toggleCartPanel = (newOpen) => () => setOpenCartPanel(newOpen);

  /* ------------------------------ data loaders ----------------------------- */
  const refreshCart = useCallback(async () => {
    try {
      const d = await api.get("/cart");
      setCart({ items: d.items, count: d.count, subTotal: d.subTotal });
    } catch {
      /* ignore: keeps previous cart */
    }
  }, []);

  const refreshWishlist = useCallback(async () => {
    try {
      const d = await api.get("/wishlist");
      setWishlist(d.items);
    } catch {
      /* ignore */
    }
  }, []);

  const loadCategories = useCallback(async () => {
    try {
      const d = await api.get("/categories");
      setCategories(d.categories);
    } catch {
      /* ignore: menus just stay empty */
    }
  }, []);

  /* --------------------------------- auth --------------------------------- */
  const login = useCallback(
    async (data) => {
      tokens.save(data);
      setUser(data.user);
      await Promise.all([refreshCart(), refreshWishlist()]);
    },
    [refreshCart, refreshWishlist]
  );

  const logout = useCallback(async () => {
    try {
      if (tokens.access) await api.post("/users/logout", { refreshToken: tokens.refresh });
    } catch {
      /* token may already be expired */
    }
    tokens.clear();
    setUser(null);
    setCart(emptyCart);
    setWishlist([]);
  }, []);

  useEffect(() => {
    loadCategories();
    (async () => {
      if (tokens.access || tokens.refresh) {
        try {
          const d = await api.get("/users/me");
          setUser(d.user);
          await Promise.all([refreshCart(), refreshWishlist()]);
        } catch {
          tokens.clear();
        }
      }
      setReady(true);
    })();
    const onLogout = () => {
      setUser(null);
      setCart(emptyCart);
      setWishlist([]);
    };
    window.addEventListener("auth:logout", onLogout);
    return () => window.removeEventListener("auth:logout", onLogout);
  }, [loadCategories, refreshCart, refreshWishlist]);

  /* ----------------------------- cart / wishlist ---------------------------- */
  const needLogin = () => {
    toast.error("Please login first");
    return false;
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!isLogin) return needLogin();
    try {
      await api.post("/cart", { productId, quantity });
      await refreshCart();
      toast.success("Added to cart");
      return true;
    } catch (e) {
      toast.error(e.message);
      return false;
    }
  };

  const updateCartItem = async (id, quantity) => {
    try {
      await api.patch(`/cart/${id}`, { quantity });
      await refreshCart();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const removeCartItem = async (id) => {
    try {
      await api.del(`/cart/${id}`);
      await refreshCart();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const inWishlist = (productId) => wishlist.some((w) => w.productId?._id === productId);

  const toggleWishlist = async (productId) => {
    if (!isLogin) return needLogin();
    try {
      if (inWishlist(productId)) {
        await api.del(`/wishlist/${productId}`);
        toast.success("Removed from wishlist");
      } else {
        await api.post("/wishlist", { productId });
        toast.success("Added to wishlist");
      }
      await refreshWishlist();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const values = useMemo(
    () => ({
      user,
      setUser,
      isLogin,
      login,
      logout,
      ready,
      cart,
      refreshCart,
      addToCart,
      updateCartItem,
      removeCartItem,
      wishlist,
      refreshWishlist,
      inWishlist,
      toggleWishlist,
      categories,
      openAlertBox,
      openCartPanel,
      setOpenCartPanel,
      toggleCartPanel,
      openQuickView: setQuickView,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, cart, wishlist, categories, openCartPanel, ready]
  );

  return (
    <>
      <BrowserRouter>
        <MyContest.Provider value={values}>
          <ScrollToTop />
          <Header />
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ProductListing" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetials />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/cart"
                element={
                  <Protected ready={ready} isLogin={isLogin}>
                    <CartPage />
                  </Protected>
                }
              />
              <Route
                path="/checkout"
                element={
                  <Protected ready={ready} isLogin={isLogin}>
                    <CheckOut />
                  </Protected>
                }
              />
              <Route
                path="/my-account"
                element={
                  <Protected ready={ready} isLogin={isLogin}>
                    <MyAccount />
                  </Protected>
                }
              />
              <Route
                path="/my-list"
                element={
                  <Protected ready={ready} isLogin={isLogin}>
                    <MyList />
                  </Protected>
                }
              />
              <Route
                path="/my-orders"
                element={
                  <Protected ready={ready} isLogin={isLogin}>
                    <Orders />
                  </Protected>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <Footer />

          {/* quick view popup, only mounted while a product is selected */}
          <Dialog
            open={!!quickView}
            fullWidth
            maxWidth="lg"
            onClose={() => setQuickView(null)}
            className="productDetailsModal"
          >
            <DialogContent>
              {quickView && (
                <div className="flex flex-col md:flex-row items-center w-full productDetailsModalContainer relative">
                  <Button
                    className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute !top-[5px] !right-[5px] !bg-[#f1f1f1] !z-50"
                    onClick={() => setQuickView(null)}>
                    <IoCloseSharp className="text-[20px]" />
                  </Button>
                  <div className="col1 w-full md:w-[40%] px-3">
                    <ProductZoom images={quickView.images} />
                  </div>
                  <div className="col2 w-full md:w-[60%] py-6 md:py-8 px-4 md:px-8 md:pr-16 productContent">
                    <ProductDetialsComponent product={quickView} onDone={() => setQuickView(null)} />
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </MyContest.Provider>
      </BrowserRouter>

      <Toaster position="top-center" />
    </>
  );
}

export default App;
export { MyContest };
