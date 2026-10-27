import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FaRegImages } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { MyContest } from "../../App";
import api from "../../api";

const empty = {
  name: "",
  description: "",
  brand: "",
  price: "",
  oldPrice: "",
  countInStock: "",
  rating: "",
  category: "",
  subCategory: "",
  sizes: "",
  isFeatured: false,
};

const ProductForm = () => {
  const { id } = useParams(); // present when editing
  const navigate = useNavigate();
  const { openAlertBox } = useContext(MyContest);

  const [form, setForm] = useState(empty);
  const [categories, setCategories] = useState([]);
  const [existing, setExisting] = useState([]); // urls already saved
  const [files, setFiles] = useState([]); // new File objects
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  useEffect(() => {
    api.get("/categories").then((d) => setCategories(d.categories)).catch((e) => openAlertBox("error", e.message));
  }, [openAlertBox]);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/products/${id}`)
      .then(({ product: p }) => {
        setForm({
          name: p.name || "",
          description: p.description || "",
          brand: p.brand || "",
          price: p.price ?? "",
          oldPrice: p.oldPrice || "",
          countInStock: p.countInStock ?? "",
          rating: p.rating || "",
          category: p.category?._id || "",
          subCategory: p.subCategory?._id || "",
          sizes: (p.sizes || []).join(", "),
          isFeatured: !!p.isFeatured,
        });
        setExisting(p.images || []);
      })
      .catch((e) => {
        openAlertBox("error", e.message);
        navigate("/products");
      })
      .finally(() => setLoading(false));
  }, [id, navigate, openAlertBox]);

  const subs = useMemo(
    () => categories.find((c) => c._id === form.category)?.children || [],
    [categories, form.category]
  );

  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);
  useEffect(() => () => previews.forEach((u) => URL.revokeObjectURL(u)), [previews]);

  const addFiles = (e) => {
    const picked = Array.from(e.target.files || []);
    const tooBig = picked.find((f) => f.size > 5 * 1024 * 1024);
    if (tooBig) openAlertBox("error", `${tooBig.name} is larger than 5MB`);
    const ok = picked.filter((f) => f.size <= 5 * 1024 * 1024);
    if (existing.length + files.length + ok.length > 8) {
      openAlertBox("error", "Maximum 8 images per product");
      return;
    }
    setFiles([...files, ...ok]);
    e.target.value = "";
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return openAlertBox("error", "Enter the product name");
    if (form.price === "" || Number(form.price) < 0) return openAlertBox("error", "Enter a valid price");
    if (!form.category) return openAlertBox("error", "Choose a category");

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    files.forEach((f) => fd.append("images", f));
    if (id) {
      if (existing.length) existing.forEach((u) => fd.append("keepImages", u));
      else fd.append("keepImages", ""); // all old images were removed
    }

    setSaving(true);
    try {
      if (id) await api.put(`/products/${id}`, fd);
      else await api.post("/products", fd);
      openAlertBox("success", id ? "Product updated" : "Product created");
      navigate("/products");
    } catch (err) {
      openAlertBox("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <CircularProgress />
      </div>
    );
  }

  return (
    <form className="bg-white shadow-md rounded-md p-4 md:p-6" onSubmit={submit}>
      <h2 className="text-[18px] font-[600] mb-5">{id ? "Edit product" : "Add product"}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <TextField label="Product name *" size="small" className="w-full" value={form.name} onChange={set("name")} />
        </div>
        <div className="md:col-span-2">
          <TextField
            label="Description"
            multiline
            minRows={4}
            className="w-full"
            value={form.description}
            onChange={set("description")}
          />
        </div>

        <TextField select label="Category *" size="small" className="w-full" value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value, subCategory: "" })}>
          {categories.map((c) => (
            <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
          ))}
        </TextField>
        <TextField select label="Sub category" size="small" className="w-full" value={form.subCategory}
          onChange={set("subCategory")} disabled={!subs.length}>
          <MenuItem value="">None</MenuItem>
          {subs.map((s) => (
            <MenuItem key={s._id} value={s._id}>{s.name}</MenuItem>
          ))}
        </TextField>

        <TextField label="Brand" size="small" className="w-full" value={form.brand} onChange={set("brand")} />
        <TextField label="Sizes (comma separated, optional)" size="small" className="w-full" placeholder="S, M, L"
          value={form.sizes} onChange={set("sizes")} />

        <TextField label="Price (ETB) *" type="number" size="small" className="w-full" value={form.price}
          onChange={set("price")} inputProps={{ min: 0 }} />
        <TextField label="Old price (ETB, shows a discount)" type="number" size="small" className="w-full"
          value={form.oldPrice} onChange={set("oldPrice")} inputProps={{ min: 0 }} />

        <TextField label="Stock quantity" type="number" size="small" className="w-full" value={form.countInStock}
          onChange={set("countInStock")} inputProps={{ min: 0 }} />
        <TextField label="Rating (0-5)" type="number" size="small" className="w-full" value={form.rating}
          onChange={set("rating")} inputProps={{ min: 0, max: 5, step: 0.5 }} />

        <div className="md:col-span-2">
          <FormControlLabel
            control={<Checkbox checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />}
            label="Show in Featured products on the home page"
          />
        </div>
      </div>

      <h3 className="text-[15px] font-[600] mt-6 mb-3">Images (up to 8, max 5MB each)</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {existing.map((url) => (
          <div key={url} className="relative rounded-md overflow-hidden border h-[120px]">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              aria-label="remove image"
              onClick={() => setExisting(existing.filter((u) => u !== url))}
              className="absolute top-1 right-1 bg-white rounded-full w-[24px] h-[24px] flex items-center justify-center shadow">
              <IoCloseSharp />
            </button>
          </div>
        ))}
        {previews.map((src, i) => (
          <div key={src} className="relative rounded-md overflow-hidden border h-[120px]">
            <img src={src} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              aria-label="remove image"
              onClick={() => setFiles(files.filter((_, j) => j !== i))}
              className="absolute top-1 right-1 bg-white rounded-full w-[24px] h-[24px] flex items-center justify-center shadow">
              <IoCloseSharp />
            </button>
          </div>
        ))}
        <div className="uploadBox rounded-md overflow-hidden border-4 border-dashed border-[rgba(0,0,0,0.2)] h-[120px] bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center flex-col relative">
          <FaRegImages className="text-[34px] opacity-40 pointer-events-none" />
          <h4 className="text-[12px] text-center pointer-events-none">Add images</h4>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={addFiles}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Button type="submit" disabled={saving} className="btn-blue btn-lg w-[200px]">
          {saving ? <CircularProgress size={22} color="inherit" /> : id ? "Save changes" : "Publish product"}
        </Button>
        <Button type="button" className="btn-lg" onClick={() => navigate("/products")}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
