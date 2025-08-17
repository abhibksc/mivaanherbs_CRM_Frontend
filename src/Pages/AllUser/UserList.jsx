import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useLocation } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const filter = new URLSearchParams(location.search).get("filter");

  useEffect(() => {
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

    axios
      .get(`${baseUrl}/admin/allusers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
      })
      .then((res) => {
        let filtered = res?.data?.data || [];

        switch (filter) {
          case "active":
            filtered = filtered.filter((u) => u.active);
            break;
          case "email-unverified":
            filtered = filtered.filter((u) => !u.isVarified_email);
            break;
          case "mobile-unverified":
            filtered = filtered.filter((u) => !u.isVarified_mobile);
            break;
        }

        setUsers(filtered);
      })
      .catch((err) => console.error(err));
  }, [filter]);

  const formatValue = (key, value) => {
    if (!value) return "-";

    if (
      key.toLowerCase().includes("date") ||
      key.toLowerCase().includes("joined")
    ) {
      return (
        <>
          {new Date(value).toISOString().split("T")[0]}
          <br />
          <span className="text-sm text-gray-500">
            {moment(value).fromNow()}
          </span>
        </>
      );
    }
    if (typeof value === "boolean") {
      return value ? "✅ Yes" : "❌ No";
    }
    return value.toString();
  };

  // ✅ Define custom headers: key (in data) → label (in table)
  const columns = [
    { key: "username", label: "User Id" },
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "mobile", label: "Mobile" },
    { key: "active", label: "Active" },
    { key: "is_Deactive", label: "De-Activate" },
    { key: "deactivate_reason", label: "De-Activate Reason" },
    { key: "joined_at", label: "Joined On" },
  ];

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">
        Users <span className="text-blue-600">({filter || "all"})</span>
      </h2>

      {users?.length > 0 ? (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="py-3 px-4 border-b">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {users.map((user, userIndex) => (
                <tr key={userIndex} className="hover:bg-gray-50 border-t">
                  {columns.map((col, idx) => (
                    <td key={idx} className="py-2 px-4 border-b">
                      {formatValue(col.key, user[col.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Loading or no users found...
        </p>
      )}
    </div>
  );
};

export default UserList;
