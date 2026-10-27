import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { BsGift, BsBank } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Badge from "../../components/Badge";
import { MyContest } from "../../App";
import api from "../../api";
import { formatPrice, fmtDate } from "../../utils";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Box = ({ color, icon, label, value }) => (
  <div className={`box ${color} p-5 rounded-md flex items-center gap-4 text-white`}>
    <div className="text-[36px]">{icon}</div>
    <div className="info">
      <h3 className="text-white text-[14px] capitalize">{label}</h3>
      <b className="text-[22px]">{value}</b>
    </div>
  </div>
);

const Dashboard = () => {
  const { openAlertBox } = useContext(MyContest);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/admin/stats")
      .then(setStats)
      .catch((e) => openAlertBox("error", e.message));
  }, [openAlertBox]);

  if (!stats) {
    return (
      <div className="flex justify-center py-24">
        <CircularProgress />
      </div>
    );
  }

  const chart = stats.monthly.map((m) => ({
    name: `${MONTHS[m.month - 1]} ${String(m.year).slice(2)}`,
    sales: m.sales,
    orders: m.orders,
  }));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        <Box color="bg-[#3872fa]" icon={<BsGift />} label="Orders" value={stats.orders.toLocaleString()} />
        <Box color="bg-[#10b981]" icon={<BsBank />} label="Revenue" value={formatPrice(stats.revenue)} />
        <Box color="bg-red-500" icon={<FiUsers />} label="Customers" value={stats.users.toLocaleString()} />
        <Box color="bg-[#7928ca]" icon={<RiProductHuntLine />} label="Products" value={stats.products.toLocaleString()} />
      </div>

      <div className="bg-white shadow-md rounded-md p-4 mb-5">
        <h2 className="text-[18px] font-[600] mb-3">Sales (last 12 months)</h2>
        {chart.length === 0 ? (
          <p className="py-10 text-center">No orders yet.</p>
        ) : (
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(v, n) => (n === "sales" ? formatPrice(v) : v)} />
                <Bar dataKey="sales" fill="#3872fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[18px] font-[600]">Recent orders</h2>
          <Link to="/orders" className="text-[#3872fa] text-[14px]">View all</Link>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent.map((o) => (
                <tr key={o._id} className="border-b">
                  <td className="px-4 py-3 whitespace-nowrap">{o.orderId}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{o.userId?.name || "-"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatPrice(o.totalAmt)}</td>
                  <td className="px-4 py-3"><Badge status={o.order_status} /></td>
                  <td className="px-4 py-3 whitespace-nowrap">{fmtDate(o.createdAt)}</td>
                </tr>
              ))}
              {stats.recent.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-6 text-center">No orders yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
