import React from "react";

const COLORS = {
  pending: "bg-primary text-white",
  confirmed: "bg-blue-500 text-white",
  shipped: "bg-amber-500 text-white",
  delivered: "bg-green-500 text-white",
  cancelled: "bg-gray-500 text-white",
  paid: "bg-green-500 text-white",
  failed: "bg-red-600 text-white",
};

const Badge = ({ status = "" }) => (
  <span
    className={`inline-block py-1 px-4 rounded-full text-[11px] capitalize ${
      COLORS[String(status).toLowerCase()] || "bg-gray-300 text-black"
    }`}>
    {status}
  </span>
);

export default Badge;
