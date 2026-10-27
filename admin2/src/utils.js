export const formatPrice = (n) =>
  `ETB ${Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

export const NO_IMAGE = "/placeholder.svg";

export const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : "-");
