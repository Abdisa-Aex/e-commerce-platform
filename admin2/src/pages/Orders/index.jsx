import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Badge from "../../components/Badge";
import { MyContest } from "../../App";
import api from "../../api";
import { fmtDate, formatPrice, NO_IMAGE } from "../../utils";

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const Orders = () => {
  const { openAlertBox } = useContext(MyContest);
  const [data, setData] = useState({ orders: [], total: 0, pages: 1 });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams({ page, limit: 10 });
      if (status) q.set("status", status);
      setData(await api.get(`/orders/admin/all?${q}`));
    } catch (e) {
      openAlertBox("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [page, status, openAlertBox]);

  useEffect(() => {
    load();
  }, [load]);

  const update = async (order, changes) => {
    try {
      await api.patch(`/orders/admin/${order._id}`, changes);
      openAlertBox("success", "Order updated");
      load();
    } catch (e) {
      openAlertBox("error", e.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md">
      <div className="p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-[600]">Orders</h2>
          <p className="mb-0 text-[13px]">{data.total} total</p>
        </div>
        <Select size="small" displayEmpty value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}
          className="!min-w-[170px] !text-[13px]">
          <MenuItem value="">All statuses</MenuItem>
          {STATUSES.map((s) => (
            <MenuItem key={s} value={s} className="!capitalize">{s}</MenuItem>
          ))}
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><CircularProgress /></div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">&nbsp;</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((o) => (
                <React.Fragment key={o._id}>
                  <tr className="border-b">
                    <td className="px-4 py-3">
                      <Button aria-label="toggle details" className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                        onClick={() => setOpenId(openId === o._id ? null : o._id)}>
                        {openId === o._id ? <FaAngleUp /> : <FaAngleDown />}
                      </Button>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-[500] text-[#3872fa]">{o.orderId}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{o.userId?.name || "-"}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-[500]">{formatPrice(o.totalAmt)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {o.paymentMethod === "COD" ? "COD" : "Online"} <Badge status={o.payment_status} />
                    </td>
                    <td className="px-4 py-3">
                      <Select size="small" value={o.order_status} onChange={(e) => update(o, { order_status: e.target.value })}
                        className="!text-[13px] !capitalize">
                        {STATUSES.map((s) => (
                          <MenuItem key={s} value={s} className="!capitalize">{s}</MenuItem>
                        ))}
                      </Select>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{fmtDate(o.createdAt)}</td>
                  </tr>

                  {openId === o._id && (
                    <tr className="bg-gray-50">
                      <td colSpan={7} className="px-4 py-4">
                        <div className="grid md:grid-cols-2 gap-4 mb-3 text-[13px]">
                          <div>
                            <b>Customer:</b> {o.userId?.name} · {o.userId?.email}
                            <br />
                            <b>Deliver to:</b> {o.delivery_address?.fullName}, {o.delivery_address?.mobile}
                            <br />
                            {o.delivery_address?.address_line}, {o.delivery_address?.city} {o.delivery_address?.state}{" "}
                            {o.delivery_address?.pincode}
                          </div>
                          <div className="flex items-center gap-3 md:justify-end">
                            <span>Payment status:</span>
                            <Select size="small" value={o.payment_status} onChange={(e) => update(o, { payment_status: e.target.value })}
                              className="!text-[13px]">
                              <MenuItem value="PENDING">PENDING</MenuItem>
                              <MenuItem value="PAID">PAID</MenuItem>
                              <MenuItem value="FAILED">FAILED</MenuItem>
                            </Select>
                          </div>
                        </div>
                        {o.items.map((it) => (
                          <div key={it.productId} className="flex items-center gap-3 py-2 border-t">
                            <img src={it.image || NO_IMAGE} alt="" className="w-[45px] h-[45px] object-cover rounded-md" />
                            <span className="flex-1">{it.name}</span>
                            <span>{it.quantity} × {formatPrice(it.price)}</span>
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
              {data.orders.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-10 text-center">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {data.pages > 1 && (
        <div className="flex justify-center py-5">
          <Pagination count={data.pages} page={page} onChange={(e, v) => setPage(v)} />
        </div>
      )}
    </div>
  );
};

export default Orders;
