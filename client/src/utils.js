export const CURRENCY = "ETB";

export const formatPrice = (n) =>
  `${CURRENCY} ${Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

// Placeholder shown when a product has no image yet
export const NO_IMAGE = "/placeholder.svg";

export const productImage = (p, i = 0) => p?.images?.[i] || NO_IMAGE;

export const discountPercent = (p) => {
  if (p?.discount) return Math.round(p.discount);
  if (p?.oldPrice && p.oldPrice > p.price) return Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
  return 0;
};

export const errMsg = (e) => e?.message || "Something went wrong";
