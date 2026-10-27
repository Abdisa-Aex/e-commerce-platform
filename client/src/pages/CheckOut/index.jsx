import { Button, CircularProgress, Radio, RadioGroup, FormControlLabel, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { MyContest } from "../../App";
import api from "../../api";
import { formatPrice, productImage } from "../../utils";

const emptyForm = { fullName: "", address_line: "", city: "", state: "", pincode: "", mobile: "" };

const CheckOut = () => {
  const context = useContext(MyContest);
  const { cart, user } = context;
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...emptyForm, fullName: user?.name || "", mobile: user?.mobile || "" });
  const [payment, setPayment] = useState("COD");
  const [config, setConfig] = useState({ shippingFee: 0, onlinePayment: false });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    Promise.allSettled([api.get("/address"), api.get("/config")]).then(([a, c]) => {
      if (a.status === "fulfilled") {
        setAddresses(a.value.addresses);
        setSelected(a.value.addresses[0]?._id || "");
        setShowForm(a.value.addresses.length === 0);
      }
      if (c.status === "fulfilled") setConfig(c.value);
      setLoading(false);
    });
  }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const saveAddress = async (e) => {
    e.preventDefault();
    if (!form.address_line.trim() || !form.city.trim() || !form.mobile.trim()) {
      context.openAlertBox("error", "Enter address, city and phone number");
      return;
    }
    setBusy(true);
    try {
      const d = await api.post("/address", form);
      setAddresses([d.address, ...addresses]);
      setSelected(d.address._id);
      setShowForm(false);
      setForm({ ...emptyForm, fullName: user?.name || "", mobile: user?.mobile || "" });
    } catch (err) {
      context.openAlertBox("error", err.message);
    } finally {
      setBusy(false);
    }
  };

  const placeOrder = async () => {
    if (!selected) return context.openAlertBox("error", "Choose or add a delivery address");
    setBusy(true);
    try {
      const { order } = await api.post("/orders", { addressId: selected, paymentMethod: payment });
      await context.refreshCart();
      if (payment === "CHAPA") {
        const { checkoutUrl } = await api.post(`/orders/${order._id}/chapa/init`);
        window.location.href = checkoutUrl; // leave for Chapa's payment page
        return;
      }
      context.openAlertBox("success", `Order ${order.orderId} placed`);
      navigate("/my-orders");
    } catch (err) {
      context.openAlertBox("error", err.message);
      await context.refreshCart();
      // the order exists but online payment could not start: pay from My orders
      if (payment === "CHAPA" && err.status === 502) navigate("/my-orders");
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <CircularProgress />
      </div>
    );
  }

  if (!cart.items.length) {
    return (
      <section className="py-16 text-center">
        <h2 className="text-[20px] font-[600] mb-2">Your cart is empty</h2>
        <Link to="/ProductListing" className="link">Continue shopping</Link>
      </section>
    );
  }

  const total = cart.subTotal + config.shippingFee;

  return (
    <section className="py-10">
      <div className="container flex flex-col lg:flex-row gap-5">
        <div className="leftCol w-full lg:w-[65%]">
          <div className="card bg-white w-full shadow-md p-5 rounded-md">
            <h2>Delivery address</h2>

            {addresses.length > 0 && (
              <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)} className="mt-3">
                {addresses.map((a) => (
                  <FormControlLabel
                    key={a._id}
                    value={a._id}
                    control={<Radio />}
                    className="!items-start border rounded-md !m-0 !mb-2 p-2"
                    label={
                      <span className="text-[14px]">
                        <b>{a.fullName}</b> · {a.mobile}
                        <br />
                        {a.address_line}, {a.city}
                        {a.state ? `, ${a.state}` : ""} {a.pincode}
                      </span>
                    }
                  />
                ))}
              </RadioGroup>
            )}

            {!showForm && (
              <Button className="btn-org btn-border !mt-2" onClick={() => setShowForm(true)}>
                + Add new address
              </Button>
            )}

            {showForm && (
              <form className="w-full mt-4" onSubmit={saveAddress}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                  <TextField className="w-full" label="Full name" size="small" value={form.fullName} onChange={set("fullName")} />
                  <TextField className="w-full" label="Phone number *" size="small" value={form.mobile} onChange={set("mobile")} />
                </div>
                <div className="pb-4">
                  <TextField className="w-full" label="Street / house no. / area *" size="small" value={form.address_line} onChange={set("address_line")} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4">
                  <TextField className="w-full" label="Town / City *" size="small" value={form.city} onChange={set("city")} />
                  <TextField className="w-full" label="State / Region" size="small" value={form.state} onChange={set("state")} />
                  <TextField className="w-full" label="Postal code" size="small" value={form.pincode} onChange={set("pincode")} />
                </div>
                <div className="flex gap-3">
                  <Button type="submit" disabled={busy} className="btn-org">Save address</Button>
                  {addresses.length > 0 && (
                    <Button type="button" className="btn-org btn-border" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            )}
          </div>

          <div className="card bg-white w-full shadow-md p-5 rounded-md mt-5">
            <h2>Payment method</h2>
            <RadioGroup value={payment} onChange={(e) => setPayment(e.target.value)} className="mt-2">
              <FormControlLabel value="COD" control={<Radio />} label="Cash on delivery" />
              {config.onlinePayment && (
                <FormControlLabel value="CHAPA" control={<Radio />} label="Pay online (Chapa: Telebirr, CBE Birr, cards)" />
              )}
            </RadioGroup>
          </div>
        </div>

        <div className="rightCol w-full lg:w-[35%]">
          <div className="card shadow-md bg-white p-5 rounded-md">
            <h2 className="mb-4">Your order</h2>

            <div className="flex items-center justify-between py-3 border-y border-[rgba(0,0,0,0.1)]">
              <span className="text-[14px] font-[600]">Product</span>
              <span className="text-[14px] font-[600]">Subtotal</span>
            </div>

            <div className="mb-5 scroll max-h-[250px] overflow-y-auto overflow-x-hidden pr-2">
              {cart.items.map((i) => (
                <div key={i._id} className="flex items-center justify-between py-2 gap-2">
                  <div className="part1 flex items-center gap-3">
                    <div className="img w-[50px] h-[50px] overflow-hidden rounded-md shrink-0">
                      <img src={productImage(i.productId)} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="info">
                      <h4 className="text-[14px] line-clamp-1">{i.productId.name}</h4>
                      <p className="text-[13px] mb-0">Qty : {i.quantity}</p>
                    </div>
                  </div>
                  <span className="text-[14px] font-[500] whitespace-nowrap">
                    {formatPrice(i.productId.price * i.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <p className="flex justify-between mb-1"><span>Subtotal</span><b>{formatPrice(cart.subTotal)}</b></p>
            <p className="flex justify-between mb-1">
              <span>Shipping</span>
              <b>{config.shippingFee ? formatPrice(config.shippingFee) : "Free"}</b>
            </p>
            <p className="flex justify-between text-[16px] border-t pt-2 mt-2">
              <span>Total</span><b className="text-primary">{formatPrice(total)}</b>
            </p>

            <Button
              className="btn-org btn-lg w-full flex items-center gap-2 !mt-3"
              disabled={busy}
              onClick={placeOrder}>
              {busy ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                <>
                  <BsFillBagCheckFill className="text-[22px]" /> Place order
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
