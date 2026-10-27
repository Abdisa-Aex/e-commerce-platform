import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import AccountSidebar from "../../components/AccountSidebar";
import Badge from "../../components/Badge";
import { MyContest } from "../../App";
import api from "../../api";
import { formatPrice, NO_IMAGE } from "../../utils";

const Orders = () => {
  const { openAlertBox } = useContext(MyContest);
  const [params, setParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    try {
      const d = await api.get("/orders/mine");
      setOrders(d.orders);
    } catch (e) {
      openAlertBox("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [openAlertBox]);

  // Coming back from Chapa's payment page: ?pay=<orderId> -> confirm the payment
  useEffect(() => {
    const txRef = params.get("pay");
    (async () => {
      if (txRef) {
        try {
          await api.get(`/orders/chapa/verify/${encodeURIComponent(txRef)}`);
          openAlertBox("success", "Payment confirmed. Thank you!");
        } catch (e) {
          openAlertBox("error", e.message);
        }
        setParams({}, { replace: true });
      }
      load();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancel = async (order) => {
    if (!window.confirm(`Cancel order ${order.orderId}?`)) return;
    setBusyId(order._id);
    try {
      await api.patch(`/orders/${order._id}/cancel`);
      openAlertBox("success", "Order cancelled");
      await load();
    } catch (e) {
      openAlertBox("error", e.message);
    } finally {
      setBusyId(null);
    }
  };

  const payNow = async (order) => {
    setBusyId(order._id);
    try {
      const d = await api.post(`/orders/${order._id}/chapa/init`);
      window.location.href = d.checkoutUrl;
    } catch (e) {
      openAlertBox("error", e.message);
      setBusyId(null);
    }
  };

  return (
    <section className="py-10 w-full">
      <div className="container flex flex-col lg:flex-row gap-5">
        <div className="col1 w-full lg:w-[20%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-full lg:w-[80%]">
          <div className="shadow-md rounded-md bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2>My Orders</h2>
              <p className="mt-0">
                There {orders.length === 1 ? "is" : "are"}{" "}
                <span className="font-bold text-primary">{orders.length}</span>{" "}
                {orders.length === 1 ? "order" : "orders"}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <CircularProgress />
              </div>
            ) : orders.length === 0 ? (
              <div className="p-8 text-center">
                <p>You have not placed any orders yet.</p>
                <Link to="/ProductListing">
                  <Button className="btn-org">Start shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="relative overflow-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-4 py-3">&nbsp;</th>
                      <th className="px-4 py-3 whitespace-nowrap">Order ID</th>
                      <th className="px-4 py-3 whitespace-nowrap">Date</th>
                      <th className="px-4 py-3 whitespace-nowrap">Total</th>
                      <th className="px-4 py-3 whitespace-nowrap">Payment</th>
                      <th className="px-4 py-3 whitespace-nowrap">Status</th>
                      <th className="px-4 py-3 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <React.Fragment key={o._id}>
                        <tr className="bg-white border-b">
                          <td className="px-4 py-3">
                            <Button
                              aria-label="toggle items"
                              className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                              onClick={() => setOpenId(openId === o._id ? null : o._id)}>
                              {openId === o._id ? <FaAngleUp /> : <FaAngleDown />}
                            </Button>
                          </td>
                          <td className="px-4 py-3 font-[500] whitespace-nowrap text-primary">{o.orderId}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{new Date(o.createdAt).toLocaleDateString()}</td>
                          <td className="px-4 py-3 whitespace-nowrap font-[500]">{formatPrice(o.totalAmt)}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {o.paymentMethod === "COD" ? "Cash on delivery" : "Online"} <Badge status={o.payment_status} />
                          </td>
                          <td className="px-4 py-3"><Badge status={o.order_status} /></td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {o.paymentMethod === "CHAPA" && o.payment_status !== "PAID" && o.order_status !== "cancelled" && (
                              <Button className="btn-org btn-sm !mr-2" disabled={busyId === o._id} onClick={() => payNow(o)}>
                                Pay now
                              </Button>
                            )}
                            {o.order_status === "pending" && o.payment_status !== "PAID" && (
                              <Button className="btn-org btn-border btn-sm" disabled={busyId === o._id} onClick={() => cancel(o)}>
                                Cancel
                              </Button>
                            )}
                          </td>
                        </tr>

                        {openId === o._id && (
                          <tr className="bg-gray-50">
                            <td colSpan={7} className="px-4 py-4">
                              <p className="text-[13px]">
                                <b>Deliver to:</b> {o.delivery_address?.fullName}, {o.delivery_address?.mobile},{" "}
                                {o.delivery_address?.address_line}, {o.delivery_address?.city}
                              </p>
                              {o.items.map((it) => (
                                <div key={it.productId} className="flex items-center gap-3 py-2 border-t">
                                  <img src={it.image || NO_IMAGE} alt="" className="w-[50px] h-[50px] object-cover rounded-md" />
                                  <div className="flex-1">
                                    <Link to={`/product/${it.productId}`} className="link text-[14px]">{it.name}</Link>
                                    <p className="text-[13px] mb-0">Qty: {it.quantity} × {formatPrice(it.price)}</p>
                                  </div>
                                  <b className="text-[14px]">{formatPrice(it.price * it.quantity)}</b>
                                </div>
                              ))}
                              <p className="text-right mt-2 mb-0 text-[13px]">
                                Subtotal {formatPrice(o.subTotalAmt)} · Shipping {formatPrice(o.shippingAmt)} ·{" "}
                                <b>Total {formatPrice(o.totalAmt)}</b>
                              </p>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
