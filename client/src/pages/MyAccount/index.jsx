import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import AccountSidebar from "../../components/AccountSidebar";
import { MyContest } from "../../App";
import api from "../../api";

const MyAccount = () => {
  const { user, setUser, openAlertBox } = useContext(MyContest);
  const [form, setForm] = useState({ name: user?.name || "", mobile: user?.mobile || "" });
  const [pw, setPw] = useState({ oldPassword: "", newPassword: "", confirm: "" });
  const [saving, setSaving] = useState(false);
  const [changing, setChanging] = useState(false);

  const saveProfile = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return openAlertBox("error", "Name cannot be empty");
    setSaving(true);
    try {
      const d = await api.put("/users/me", form);
      setUser(d.user);
      openAlertBox("success", "Profile updated");
    } catch (err) {
      openAlertBox("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (pw.newPassword.length < 8) return openAlertBox("error", "New password must be at least 8 characters");
    if (pw.newPassword !== pw.confirm) return openAlertBox("error", "Passwords do not match");
    setChanging(true);
    try {
      await api.put("/users/change-password", { oldPassword: pw.oldPassword, newPassword: pw.newPassword });
      openAlertBox("success", "Password changed");
      setPw({ oldPassword: "", newPassword: "", confirm: "" });
    } catch (err) {
      openAlertBox("error", err.message);
    } finally {
      setChanging(false);
    }
  };

  return (
    <section className="py-10 w-full">
      <div className="container flex flex-col lg:flex-row gap-5">
        <div className="col1 w-full lg:w-[20%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-full lg:w-[55%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <h2 className="p-3">My Profile</h2>
            <hr />
            <form className="mt-5" onSubmit={saveProfile}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <TextField
                  label="Full name"
                  size="small"
                  className="w-full"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <TextField label="Email" size="small" className="w-full" value={user?.email || ""} disabled />
                <TextField
                  label="Phone number"
                  size="small"
                  className="w-full"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                />
              </div>
              <br />
              <Button type="submit" disabled={saving} className="btn-org btn-lg w-[120px]">
                {saving ? <CircularProgress size={22} color="inherit" /> : "Save"}
              </Button>
            </form>
          </div>

          <div className="card bg-white p-5 shadow-md rounded-md mt-5">
            <h2 className="p-3">Change password</h2>
            <hr />
            <form className="mt-5" onSubmit={changePassword}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <TextField type="password" label="Old password" size="small" className="w-full" autoComplete="current-password"
                  value={pw.oldPassword} onChange={(e) => setPw({ ...pw, oldPassword: e.target.value })} />
                <TextField type="password" label="New password" size="small" className="w-full" autoComplete="new-password"
                  value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} />
                <TextField type="password" label="Confirm" size="small" className="w-full" autoComplete="new-password"
                  value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
              </div>
              <br />
              <Button type="submit" disabled={changing} className="btn-org btn-lg">
                {changing ? <CircularProgress size={22} color="inherit" /> : "Update password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
