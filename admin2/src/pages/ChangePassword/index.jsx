import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { MyContest } from "../../App";
import api from "../../api";

const ChangePassword = () => {
  const { openAlertBox } = useContext(MyContest);
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirm: "" });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.newPassword.length < 8) return openAlertBox("error", "New password must be at least 8 characters");
    if (form.newPassword !== form.confirm) return openAlertBox("error", "Passwords do not match");
    setSaving(true);
    try {
      await api.put("/users/change-password", { oldPassword: form.oldPassword, newPassword: form.newPassword });
      openAlertBox("success", "Password changed");
      setForm({ oldPassword: "", newPassword: "", confirm: "" });
    } catch (err) {
      openAlertBox("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="bg-white shadow-md rounded-md p-5 max-w-[480px]" onSubmit={submit}>
      <h2 className="text-[18px] font-[600] mb-5">Change password</h2>
      <div className="flex flex-col gap-4">
        <TextField type="password" label="Current password" size="small" value={form.oldPassword}
          onChange={set("oldPassword")} autoComplete="current-password" />
        <TextField type="password" label="New password (min 8 characters)" size="small" value={form.newPassword}
          onChange={set("newPassword")} autoComplete="new-password" />
        <TextField type="password" label="Confirm new password" size="small" value={form.confirm}
          onChange={set("confirm")} autoComplete="new-password" />
        <Button type="submit" disabled={saving} className="btn-blue btn-lg">
          {saving ? <CircularProgress size={22} color="inherit" /> : "Update password"}
        </Button>
      </div>
    </form>
  );
};

export default ChangePassword;
