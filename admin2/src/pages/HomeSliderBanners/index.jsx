import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { GoTrash } from "react-icons/go";
import { FaRegImages } from "react-icons/fa";
import { MyContest } from "../../App";
import api from "../../api";

const HomeSliderBanners = () => {
  const { openAlertBox } = useContext(MyContest);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      setSlides((await api.get("/slides")).slides);
    } catch (e) {
      openAlertBox("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [openAlertBox]);

  useEffect(() => {
    load();
  }, [load]);

  const add = async (e) => {
    e.preventDefault();
    if (!file) return openAlertBox("error", "Choose a banner image");
    if (file.size > 5 * 1024 * 1024) return openAlertBox("error", "Image is larger than 5MB");
    const fd = new FormData();
    fd.append("image", file);
    if (link.trim()) fd.append("link", link.trim());
    setSaving(true);
    try {
      await api.post("/slides", fd);
      openAlertBox("success", "Slide added");
      setFile(null);
      setLink("");
      e.target.reset();
      load();
    } catch (err) {
      openAlertBox("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (s) => {
    if (!window.confirm("Delete this slide?")) return;
    try {
      await api.del(`/slides/${s._id}`);
      openAlertBox("success", "Slide deleted");
      load();
    } catch (err) {
      openAlertBox("error", err.message);
    }
  };

  return (
    <>
      <form className="bg-white shadow-md rounded-md p-4 mb-5" onSubmit={add}>
        <h2 className="text-[18px] font-[600] mb-1">Add home slide</h2>
        <p className="text-[13px] mb-4">Wide banner images work best (for example 1400 × 500).</p>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="uploadBox rounded-md border-4 border-dashed border-[rgba(0,0,0,0.2)] h-[90px] w-full md:w-[220px] bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center flex-col relative shrink-0">
            <FaRegImages className="text-[28px] opacity-40 pointer-events-none" />
            <span className="text-[12px] pointer-events-none px-2 text-center break-all">
              {file ? file.name : "Choose image"}
            </span>
            <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>
          <TextField label="Link when clicked (optional, e.g. /ProductListing)" size="small" className="w-full"
            value={link} onChange={(e) => setLink(e.target.value)} />
          <Button type="submit" disabled={saving} className="btn-blue btn-lg !min-w-[140px]">
            {saving ? <CircularProgress size={22} color="inherit" /> : "Add slide"}
          </Button>
        </div>
      </form>

      <div className="bg-white shadow-md rounded-md p-4">
        <h2 className="text-[18px] font-[600] mb-4">Current slides ({slides.length})</h2>
        {loading ? (
          <div className="flex justify-center py-10"><CircularProgress /></div>
        ) : slides.length === 0 ? (
          <p className="py-6 text-center">No slides yet. The home page hides the slider until you add one.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {slides.map((s) => (
              <div key={s._id} className="relative rounded-md overflow-hidden border group">
                <img src={s.image} alt="" className="w-full h-[150px] object-cover" />
                {s.link && <span className="absolute bottom-0 left-0 bg-black/60 text-white text-[11px] px-2 py-1">{s.link}</span>}
                <Button aria-label="delete slide" onClick={() => remove(s)}
                  className="!absolute top-2 right-2 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white">
                  <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeSliderBanners;
