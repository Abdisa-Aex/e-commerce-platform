import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { MyContest } from "../../App";
import api from "../../api";

const SubCategory = () => {
  const { openAlertBox } = useContext(MyContest);
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(null); // { id?, name, parentId }
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      setParents((await api.get("/categories")).categories);
    } catch (e) {
      openAlertBox("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [openAlertBox]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    if (!dialog.name.trim()) return openAlertBox("error", "Enter a name");
    if (!dialog.id && !dialog.parentId) return openAlertBox("error", "Choose the parent category");
    const fd = new FormData();
    fd.append("name", dialog.name.trim());
    if (!dialog.id) fd.append("parentId", dialog.parentId);
    setSaving(true);
    try {
      if (dialog.id) await api.put(`/categories/${dialog.id}`, fd);
      else await api.post("/categories", fd);
      openAlertBox("success", "Saved");
      setDialog(null);
      load();
    } catch (e) {
      openAlertBox("error", e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (s) => {
    if (!window.confirm(`Delete sub category "${s.name}"?`)) return;
    try {
      await api.del(`/categories/${s._id}`);
      openAlertBox("success", "Deleted");
      load();
    } catch (e) {
      openAlertBox("error", e.message);
    }
  };

  const rows = parents.flatMap((p) => p.children.map((c) => ({ ...c, parentName: p.name })));

  return (
    <div className="bg-white shadow-md rounded-md">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-[18px] font-[600]">Sub categories</h2>
        <Button className="btn-blue btn-sm flex gap-1" onClick={() => setDialog({ name: "", parentId: "" })}>
          <IoMdAdd className="text-[18px]" /> Add sub category
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><CircularProgress /></div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Sub category</th>
                <th className="px-4 py-3">Parent category</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s._id} className="border-b">
                  <td className="px-4 py-3 font-[600]">{s.name}</td>
                  <td className="px-4 py-3">{s.parentName}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button aria-label="edit" className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                        onClick={() => setDialog({ id: s._id, name: s.name, parentId: s.parentId })}>
                        <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                      </Button>
                      <Button aria-label="delete" className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                        onClick={() => remove(s)}>
                        <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={3} className="px-4 py-10 text-center">No sub categories yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={!!dialog} onClose={() => setDialog(null)} fullWidth maxWidth="xs">
        <DialogTitle>{dialog?.id ? "Edit sub category" : "Add sub category"}</DialogTitle>
        <DialogContent>
          <div className="pt-2 flex flex-col gap-4">
            <TextField select label="Parent category" size="small" className="w-full" disabled={!!dialog?.id}
              value={dialog?.parentId || ""} onChange={(e) => setDialog({ ...dialog, parentId: e.target.value })}>
              {parents.map((p) => (
                <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>
              ))}
            </TextField>
            <TextField label="Sub category name" size="small" className="w-full" value={dialog?.name || ""}
              onChange={(e) => setDialog({ ...dialog, name: e.target.value })} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(null)}>Cancel</Button>
          <Button className="btn-blue" disabled={saving} onClick={save}>
            {saving ? <CircularProgress size={20} color="inherit" /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubCategory;
