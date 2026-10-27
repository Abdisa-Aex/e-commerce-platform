import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { MyContest } from "../../App";
import api from "../../api";
import { NO_IMAGE } from "../../utils";

const Category = () => {
  const { openAlertBox } = useContext(MyContest);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(null); // null | { id?, name }
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      setItems((await api.get("/categories")).categories);
    } catch (e) {
      openAlertBox("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [openAlertBox]);

  useEffect(() => {
    load();
  }, [load]);

  const close = () => {
    setDialog(null);
    setFile(null);
  };

  const save = async () => {
    if (!dialog.name.trim()) return openAlertBox("error", "Enter a category name");
    const fd = new FormData();
    fd.append("name", dialog.name.trim());
    if (file) fd.append("image", file);
    setSaving(true);
    try {
      if (dialog.id) await api.put(`/categories/${dialog.id}`, fd);
      else await api.post("/categories", fd);
      openAlertBox("success", "Saved");
      close();
      load();
    } catch (e) {
      openAlertBox("error", e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (c) => {
    if (!window.confirm(`Delete "${c.name}" and its sub categories?`)) return;
    try {
      await api.del(`/categories/${c._id}`);
      openAlertBox("success", "Category deleted");
      load();
    } catch (e) {
      openAlertBox("error", e.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-[18px] font-[600]">Categories</h2>
        <Button className="btn-blue btn-sm flex gap-1" onClick={() => setDialog({ name: "" })}>
          <IoMdAdd className="text-[18px]" /> Add category
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><CircularProgress /></div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Sub categories</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c._id} className="border-b">
                  <td className="px-4 py-3">
                    <img src={c.image || NO_IMAGE} alt="" className="w-[50px] h-[50px] object-cover rounded-md" />
                  </td>
                  <td className="px-4 py-3 font-[600]">{c.name}</td>
                  <td className="px-4 py-3">{c.children.length}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button aria-label="edit" className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                        onClick={() => setDialog({ id: c._id, name: c.name })}>
                        <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                      </Button>
                      <Button aria-label="delete" className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                        onClick={() => remove(c)}>
                        <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-10 text-center">No categories yet. Add your first one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={!!dialog} onClose={close} fullWidth maxWidth="xs">
        <DialogTitle>{dialog?.id ? "Edit category" : "Add category"}</DialogTitle>
        <DialogContent>
          <div className="pt-2">
            <TextField label="Category name" size="small" className="w-full" value={dialog?.name || ""}
              onChange={(e) => setDialog({ ...dialog, name: e.target.value })} autoFocus />
            <div className="mt-4">
              <label className="text-[13px] block mb-1">Image (optional)</label>
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button className="btn-blue" disabled={saving} onClick={save}>
            {saving ? <CircularProgress size={20} color="inherit" /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Category;
