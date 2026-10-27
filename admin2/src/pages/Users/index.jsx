import React, { useCallback, useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Badge from "../../components/Badge";
import { MyContest } from "../../App";
import api from "../../api";
import { fmtDate } from "../../utils";

const Users = () => {
  const { openAlertBox, user: me } = useContext(MyContest);
  const [data, setData] = useState({ users: [], total: 0, pages: 1 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams({ page, limit: 10 });
      if (query) q.set("search", query);
      setData(await api.get(`/users?${q}`));
    } catch (e) {
      openAlertBox("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [page, query, openAlertBox]);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (u, status) => {
    try {
      await api.patch(`/users/${u._id}/status`, { status });
      openAlertBox("success", `${u.name} is now ${status}`);
      load();
    } catch (e) {
      openAlertBox("error", e.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md">
      <div className="p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-[600]">Users</h2>
          <p className="mb-0 text-[13px]">{data.total} total</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
            setQuery(search.trim());
          }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email..."
            className="border border-[rgba(0,0,0,0.2)] rounded-md h-[40px] px-3 text-[14px] focus:outline-none"
          />
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><CircularProgress /></div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Verified</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((u) => (
                <tr key={u._id} className="border-b">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-[#f1f1f1] shrink-0">
                        {u.avatar && <img src={u.avatar} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <h3 className="text-[14px] font-[600] leading-4">{u.name}</h3>
                        <span className="text-[12px]">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{u.mobile || "-"}</td>
                  <td className="px-4 py-3">{u.role}</td>
                  <td className="px-4 py-3">{u.verify_email ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{fmtDate(u.createdAt)}</td>
                  <td className="px-4 py-3">
                    {String(u._id) === String(me?._id) ? (
                      <Badge status={u.status} />
                    ) : (
                      <Select size="small" value={u.status} onChange={(e) => setStatus(u, e.target.value)} className="!text-[13px]">
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                        <MenuItem value="Suspended">Suspended</MenuItem>
                      </Select>
                    )}
                  </td>
                </tr>
              ))}
              {data.users.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {data.pages > 1 && (
        <div className="flex justify-center py-5">
          <Pagination count={data.pages} page={page} onChange={(e, v) => setPage(v)} />
        </div>
      )}
    </div>
  );
};

export default Users;
